const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=897c9c6a7869068ab33e612ee3076bf8&query=${lat},${long}&units=m`
request({ url, json: true}, (error, { body } = {}) => {
    if (error) {
        callback('could not connect to the server', undefined)
    }else if(body.error){
     callback('please specify a valid location', undefined)
    }
     else {

        const temperature =body.current.temperature
        const precipitation = body.current.precip
        const  weatherDesciption = body.current.weather_descriptions

         const data = {
             temperature,
             precipitation,
             weatherDesciption
         }
         callback(undefined, `The current temperature is ${data.temperature} degrees, and the weather feels ${data.weatherDesciption}, with a ${data.precipitation}% of rainfall`)
    }
}
    )
}

module.exports = forecast