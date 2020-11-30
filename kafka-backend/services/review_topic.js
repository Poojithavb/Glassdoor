'use strict';

const Review = require('../models/review');
const redisClient = require('../config/redisConfig');

exports.reviewService = function (msg, callback) {
  console.log('In reviewService - path:', msg.path);
  switch (msg.path) {
    case 'companyReviews':
      companyReviews(msg, callback);
      break;

    case 'updateFavFeatured':
      updateFavFeatured(msg, callback);
      break;

    case 'reviewsPerDay':
      ReviewsPerDay(msg, callback);
      break;
  }
};

async function companyReviews(msg, callback) {
  let err = {};
  let response = {};
  console.log('In companyReviews service. Msg: ', msg);
  console.log(msg.body);

  redisClient.get('allReviews', function (err, data) {
    if (err) {
      console.log('error');
      response.status = 400;
    }
    // else if (data) {
    //     console.log("fetching from redis cache");
    //     console.log(data);
    //     response.data = (JSON.parse(data));
    //     console.log(response);
    //     return callback( null, response)
    // }
    else {
      console.log('fetching from mongoDb');
      Review.find({ company: msg.body }, function (err, doc) {
        if (err || !doc) {
          response.status = 400;
        } else {
          //redisClient.setex("allReviews", 36000, JSON.stringify(doc));
          response.status = 200;
          response.data = doc;
          //console.log(response)
          return callback(null, response);
        }
      });
    }
  });
}

async function updateFavFeatured(msg, callback) {
  let err = {};
  let response = {};
  console.log('In updateCompanyDetails service. Msg: ', msg);

  if (msg.colValue == 'favourite') {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { favorite: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log('Review marks as favourite');
        response.status = 200;
        response.message = 'REVIEW_UPDATED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await Review.findByIdAndUpdate(
      { _id: msg.id },
      { featured: true },
      { safe: true, new: true, useFindAndModify: false }
    )
      .then((user) => {
        console.log(user);
        console.log('Review marks as featured');
        response.status = 200;
        response.message = 'REVIEW_UPDATED';
        return callback(null, response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function ReviewsPerDay(msg, callback) {
  console.log('In ReviewsPerDay: ');
  console.log(Object.keys(msg.body));
  let ids = Object.keys(msg.body);
  const page = parseInt(msg.page) || 1;
  await Review.aggregate(
    [
      // {
      //   $match: { sql_company_id: { $in: ids } },
      // },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' },
            year: { $year: '$date' },
          },
          reviews: { $sum: 1 },
        },
        // $project: { $sql_company_id: 1 },
        // $group: {
        //   _id: '$sql_company_id',
        //   avgrating: { $avg: '$rating' },
        //   // reviews: 1,
        // },
      },
    ],
    function (err, results) {
      console.log('Results:', results);
      // for (var each of results) {
      //   msg.body[each._id].reviews = each.reviews;
      //   // msg.body[each._id].rating = each.rating;
      // }
      // console.log('msg.body:', msg.body);
      callback(null, results);
    }
  );
}
