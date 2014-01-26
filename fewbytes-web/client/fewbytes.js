var feeds = new Meteor.Collection('feeds');
var items = new Meteor.Collection('items');

Template.admin.feeds = function () {
    return feeds.find({});
};

Template.admin.events({
    'click #add': function (e, t) {
        feeds.insert({url: t.find('.url').value});
    },
    'click .remove': function () {
        feeds.remove(this._id);
    }

});

Template.items.displayFeeds = function () {
    return feeds.find().map(function (x) {
        return {items: items.find({feedId: x._id}, {limit: 10, sort: {date: -1}}), url: x.url};
    })
};