
var express = require('express');
var app = express();
//var bodyParser = require(body-parser);
var path = require('path')
//console.log('Hello World');

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
}
app.use(logger)

app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/', function(req, res){
  //res.send("Hello Express");
  res.sendFile(path.join(__dirname, './views/index.html'));
})
const response = "Hello json";
app.get("/json", (req, res) => {
  //res.json({message: "Hello json"})
  res.json({
    message: process.env.MESSAGE_STYLE === 'uppercase' ? response.toUpperCase() : response
  })

})

 
  app.get('/now', (req, res, next) =>{
    req.time = new Date().toString()
    next()

  },
  (req, res) => {
    res.send({
      time: req.time
    })
  }
  )

  app.get('/:word/echo', (req, res) => {
    let { word } = req.params;
    res.json({
      echo: word
    })

  })

  




/*app.get('/name', (req, res) => {
  const firstname = req.query.first;
  const lastname = req.query.last;
}, (req, res) => {
  res.send({name: {name: `${firstname} ${lastname}`}
  })
}) */
app.get('/name', (req, res) => {
   var first = req.query.first;
   var last = req.query.last;
   var jsonObj = {name: `${first} ${last}`};
   res.send(jsonObj);
 });

 app.use(express.urlencoded({
   extended: false
   }))
/*
   app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});
*/

   app.post('/name', (req, res) => {
     const jsonObj = `${req.body.first} ${req.body.last}`
     res.json({name: jsonObj});
   })
  

























 module.exports = app;
