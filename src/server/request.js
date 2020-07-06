const dotenv = require("dotenv");
dotenv.config();

function validateInputRequest(req, res, next) {
  console.log(req.body);
  if (!req.body.text) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }
  return next();
}

function Posting(req, res, next) {
  //API and KEY //
  var aylien = require("aylien_textapi");

  var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
  });

  textapi.sentiment(
    {
      url: req.body.text,
    },
    function (error, response) {
      if (error === null) {
        res.send(response);
      }
    }
  );

  //End API and KEY//
}

exports.validateInputRequest = validateInputRequest;
exports.Posting = Posting;
