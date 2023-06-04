const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile')


/**
 * Middleware.
 */
router.use('/:interval', (req, res, next) => {
  // check cookie data.

//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
//   res.setHeader('Access-Control-Allow-Credentials', true)

  // console.log('Cookies: ', req.cookies)

  next()
}, (req, res, next) => {
  
  next()
})









/**
 * Gets weather data from db. 
 * @param {String} interval 
 * @returns {JSON}
 */
async function getData(interval) {
    let jsonData;
    return await jsonfile.readFile(`./data/${interval}_weather.json`)
      .then(data => {
        return data;
    })
      .catch(err => console.log("Problem getting data: ", err))



}

function getcookie(req) {
    var cookie = req.headers.cookie;
    // user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
    return cookie.split('; ');
}

/**
 * Get location specific weather data.
 * @param {String} interval "Forcast interval. Now, 24 hour, 48 hour forcast."
 * @returns {JSON}
 */
router.get("/:interval&:location", async (req, res) => {
    // req.session.location = {
    //     "country": "New Zealand",
    //     "city": "Christchurch",
    //     "suburb": "Hornby"
    // }

    // var cookie = getcookie(req);
    // console.log("req cookie: ", cookie)


    res.setHeader('Access-Control-Allow-Methods', '*');

    let interval = req.params.interval;
    let locationArr = req.params.location;
    let location;

    // console.log("location split:", locationArr.split(','))
    try {             // Try instantiate location json object.
      locationArr = locationArr.split(',')

      location = {
        "country": locationArr[0],
        "city": locationArr[1],
        "suburb": locationArr[2]
      }
    } catch {
      res.json("User location was not provided.");
      return;
    }
    // let location = req.session.location;        // User cookie.

    console.log("param location:", location)
    let data = await getData(interval);         // Get weather data.
    
    console.log("getData:", data)

    // Retun weather data with matching 'interval' location.
    let country, city, suburb;
    let weather_data = data.filter(weather => {
        country = weather.country;
        city = weather.city;
        suburb = weather.suburb;

        
        return (JSON.stringify({country, city, suburb}) == JSON.stringify(location))
    })

    console.log("weather data:", weather_data)
    
    res.json(weather_data)
})






// https://www.youtube.com/watch?v=GihQAC1I39Q

module.exports = router;