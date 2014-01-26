var request = Npm.require('request');

var items = new Meteor.Collection('items');
var feeds = new Meteor.Collection('feeds');

Reader = function () {
    this.read = function (url, itemCallback) {
        request(url)
            .pipe(new Feedparser())
            .on('readable', function () {
                var stream = this, item;
                while (item = stream.read()) {
                    itemCallback(item);
                }
            });
    }
};

Meteor.setInterval(function () {

    feeds.find({}).forEach(function (x) {
        var mostRecentPost = items.findOne({feedId: x._id}, {sort: {date: -1}});
        if (mostRecentPost)
            console.log("Found most recent item to be: " + mostRecentPost.date);

        new Reader().read(x.url, Meteor.bindEnvironment(function (item) {
                if (mostRecentPost && (item.date - mostRecentPost.date) <= 0)
                    return;

                console.log('Adding ', item.title);
                items.insert({title: item.title || item.description, date: item.date, feedId: x._id, discoveredAt: new Date()});
            }
        ))
    });
}, 5000);

redisClient = redis.createClient();

items.find().observe({
    added: function (x) {
        var jsonString = JSON.stringify({title: x.title, date: x.date, feedId: x.feedId});
        redisClient.publish('items', jsonString);
    }
});

feeds.find().observe({
    added: function (x) {
        redisClient.publish('feeds', JSON.stringify({url: x.url, action: 'added'}));
    },
    removed: function (x) {
        redisClient.publish('feeds', JSON.stringify({url: x.url, action: 'removed'}));
    }
});