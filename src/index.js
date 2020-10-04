const express = require('express');
const app = express();
const path = require('path');

//settings 

app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//middlewaress



//routes
app.use(require('./routes/index'))

//static files
app.use("/public",express.static(path.join(__dirname,'public')))

//listenig server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});