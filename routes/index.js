var express = require('express');
var db = require('../models/_db');
var Place = require('../models/place');
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Promise = require('bluebird');
var router = express.Router();


router.get('/', function(req, res) {
  Promise.all([
      Place.findAll(),
      Hotel.findAll(),
      Restaurant.findAll(),
      Activity.findAll()
    ])
    .spread(function(places, hotels, restaurants, activities) {
      res.render('index', {places, hotels, restaurants, activities});
    })
  
});

module.exports = router;
