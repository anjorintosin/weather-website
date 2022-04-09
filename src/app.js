
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const { response } = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
app.use(express.static(publicDirectoryPath))
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')


//set up handlebars engine
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


//setup static directory to set
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        body: 'Anjorin Olutosin',

    })

}) 

app.get('/about', (req, res) =>{
 res.render('about', {
    title: 'About Page', 
    body: 'Anjorin Olutosin',
 
 })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        helpText: 'this is the help page',
        body:'Anjorin alutosin'
    })
})

app.get('/weather' , (req, res) => {
if(!req.query.address){
return res.send({
    error: 'you must provide an address'
})
} else {
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
          
             return res.send({
                error
            })
        }
        
            forecast(latitude, longitude, (error, forecastData) =>{
                if(error){
                    return res.send({
                        error
                    })
                }
               return res.send({
                   location,
                  forecast: forecastData,
                   address: req.query.address
               })
                   } )
           
           }) 
}



})

app.get('/help/*', (req, res) =>{
res.render('not-found', {
    title: 'Article not found',
    errorMessage: 'we could not find that article',
    body:'Anjorin Olutosin'
})
})

app.get('/products', (req, res) =>{
if(!req.query.search){
  return res.send({
      error: 'you must provide a search term'
  })
}
    console.log(req.query.search)
    res.send({
     products: [],

 })
})

// setting up 404 page
app.get('*', (req, res) =>{
res.render('404', {
    title: '404 Page',
    errorMessage: 'This is page was not found',
    body:'Anjorin Olutosin'
})
})

// Setting up server

app.listen(port, () =>{
        console.log('connected to the server to port ' + port)})