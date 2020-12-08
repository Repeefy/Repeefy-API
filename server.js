let express = require('express');
const app = express();
let http = require('http');
let port = process.env.PORT || 8020
const bodyParser = require('body-parser');
const routes = require('./route');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

app.get('*', (req, res) => {
    res.send({
        message: "Repify is up and running"
    })
})

app.post('*', (req, res) => {
    res.send({
        message: "Repify is up and running"
    })
})
 
const server = http.createServer(app);

server.listen(port, (err) => {
    if(err) {return err};
    console.log("server running on port ", port)
})