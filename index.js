const express = require("express");
const fetch = require("isomorphic-fetch");
const cors = require("cors");
require("dotenv/config");

const port = process.env.PORT || 4001;
// App id for openweathermap
const APP_ID = process.env.APP_ID;

// Initialize app and enable cross-origin resource sharing
const app = express();
app.use(cors());

// GET /
app.get("/restaurants", (req, res) => {
  const entity_id = req.param("entity_id");
  const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${entity_id}&entity_type=city&count=5&sort=rating&order=desc`;
  console.log(url);
  console.log(APP_ID);
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-key": `${APP_ID}`
    }
  })
    .then(response => {
      response.json();
    })
    .then(data => {
      console.log(data);
      return res.json({
        restaurants: data.restaurants
      });
    });
});

module.exports = app;

// Start the app on the provided port
app.listen(port, () => {
  console.log(`Service listening on port ${port}`);
});
