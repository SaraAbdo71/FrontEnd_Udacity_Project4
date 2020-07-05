

//API and KEY //
var aylien =require("aylien_textapi");
var textapi =new aylien({
    application_id:process.env.API_ID,
    application_key:process.env.API_KEY
});

const dotenv = require('dotenv');
dotenv.config();
//End API and KEY//