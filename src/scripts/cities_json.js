const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('worldcities.csv')
  .pipe(csv())
  .on('data', (data) => 
    results.push({
      city: data.city,
      country: data.country,
      lat: data.lat,
      lng: data.lng
    })
  )
  .on('end', () => {
    console.log(results);
    let jsonStr = JSON.stringify(results);
    fs.writeFileSync("worldcities.json", jsonStr);
  });
