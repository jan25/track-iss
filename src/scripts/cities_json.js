const csv = require('csv-parser')
const fs = require('fs')
const worldCities = require('./worldcities.json');
const distance = require('@turf/turf').distance;
const results = [];
 
let getNearestCity = (latLong)=> {
  let near;
  let minDist = 10000; // 'km'
  for (let city of worldCities) {
      let d = distance(
          [parseFloat(city.lng), parseFloat(city.lat)],
          [latLong.longitude, latLong.latitude],
          {
              units: 'kilometers'
          }
      );
      if (d < minDist) {
          minDist = d;
          near = city;
      }
  }
  return {
      city: near.city,
      country: near.country,
      // status: Status.Available
  };
}

console.log(getNearestCity({
  latitude: Math.random() * 100,
  longitude: Math.random() * 100
}))

// fs.createReadStream('worldcities.csv')
//   .pipe(csv())
//   .on('data', (data) => 
//     results.push({
//       city: data.city,
//       country: data.country,
//       lat: data.lat,
//       lng: data.lng
//     })
//   )
//   .on('end', () => {
//     console.log(results);
//     let jsonStr = JSON.stringify(results);
//     fs.writeFileSync("worldcities.json", jsonStr);
//   });
