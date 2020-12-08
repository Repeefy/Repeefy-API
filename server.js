let express = require('express');
const app = express();
let http = require('http');
let port = process.env.PORT || 8020
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        message: "server up and running"
    })
})
 
const server = http.createServer(app);

server.listen(port, (err) => {
    if(err) {return err};
    console.log("server running on port ", port)
})