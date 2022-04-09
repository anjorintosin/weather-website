const request = require('request')



const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoiYW5qb3JpbnRvc2luMDgwIiwiYSI6ImNsMGpic3QxajBheDIzZW96ZThtZDFsM3MifQ.xY4WeHQVz3Qf4v2ywBgvug'
    
    request({ url , json: true}, (error, { body } = {}) =>{
 if (error) {
    callback('Could not connect to the  server', undefined)
 } else if(body.features.length === 0 ) {
    callback('unable to find location try another search', undefined)
}else{

const location = body.features[1].place_name
const latitude =  body.features[1].geometry.coordinates[1]
const longitude = body.features[1].geometry.coordinates[0]
   const data = {
       location,
       latitude,
       longitude
   }
    callback(undefined, data)
}
 
    })
}

module.exports = geocode 