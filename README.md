Fewbytes
========

# What is missing 
Because this is a sandboxed test

* Error handing, I do not check or validated
* Tests - I love testing and I know testing - this is not production for real - so no ROI
* Nice UI
* Logging
* Deployment script/chef solo type of script
* Security
* Some user flows that needs to be in the full product

# Technologies

## Meteor.js

### Pros
* Because it's fun and cool :)
* Because it solved the realtime problem in a very simple manner
* Same language on server and client
* Strong module ecosystem

### Cons 
* Very young framework
* Not high scale or production grade ready
* A blackbox

## Redis

Choose redis becuase the pub/sub module is very simple and solid in redis, many client libraries and it's easy to deploy.
I was not going to develop the pub/sub from scratch, there is no ROI for it

## Ruby for CLI

Ruby is fun and easy to work with, it has all the libraries required, was very fast to create what was needed

# Run locally

* Install Redis
* Install Nodejs
* Install Meteor CLI by running

`$ curl https://install.meteor.com/ | sh`

* Install meteor packages by

```sh
sudo -H npm install -g meteorite #installing meteorite nodejs module
cd fewbytes/fewbytes-web
mrt install
```

* Start redis-server
* Go to the product folder and type

`meteor`
    
# Run CLI
```sh
cd fewbytes/fewbytes-cli
bundle

./fewbytes-cli debug
```
