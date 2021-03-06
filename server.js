const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const items = require('./routes/api/items');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

//Body parser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI

//Connect to mongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB connected..."))
	.catch(err => console.log(err));

//Use routes
app.use('/api/items', items);

//Serve static assets when in production
if(process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}


app.listen(PORT, () => console.log("Server running at port", PORT));
