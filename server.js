express = require('express');
cors = require('cors');
cookieParser = require('cookie-parser');
cookieSession  = require('cookie-session');

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(cookieParser())



server.set('trust proxy', 1) // trust first proxy

server.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))





server.get('/api', (req, res) => {
    req.session.name = "testing cookie session"
    console.log('Cookies: ', req.session.name)
    res.json("test")


})




const weatherRouter = require('./routes/weather');
// Link route to the map router
server.use('/api/weather', weatherRouter);

server.listen(port, () => {
    console.log("heroku test port -->", port)
})