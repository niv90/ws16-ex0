var util = require('util');
var events = require('events');
var eventConfig = require('./config');
var logs = [];

//--Hotle Object Constructor
var Hotle = function(){
    
    this.data = {
        name: null,
        brunch: null,
        reviews: 0,
    };

    events.EventEmitter.call(this);
    util.inherits(Hotle,events.EventEmitter);

    //setter 
    this.setAllData = function(info){
        for(var i in this.data){
            if(i != 'reviews' )
                this.data[i] = info[i];
        }
    };

    //getter
    this.getAllData = function() {
        return this.data;
    }

};

//hotle Object prototypes
Hotle.prototype.like = function(rate){
    this.data.reviews += rate;
    this.emit(eventConfig.likeChange);
}

Hotle.prototype.unlike = function(rate){
    if((this.data.reviews - rate) < 0){
        console.log("The review will be negative,Please try again");
        logs.push("The review will be negative,Please try again \n");
    }
    else{
       this.data.reviews -= rate;
        this.emit(eventConfig.likeChange);
    }
   
}

Hotle.prototype.getLogs = function(){
    return logs;
}

//the callBack function
function displayReviews(){
    console.log("Hotle Name:" + this.data.name +  " ,brunch:" + this.data.brunch + " ,reviews:" + this.data.reviews);
    logs.push("Hotle Name:" + this.data.name +  " ,brunch:" + this.data.brunch + " ,reviews:" + this.data.reviews + "\n");
}

//create hotle instance and attach callbacks to event
module.exports = function(info){
    var hotleReviews = new Hotle();
    hotleReviews.setAllData(info);
    hotleReviews.on(eventConfig.likeChange , displayReviews);
    return hotleReviews; 

};