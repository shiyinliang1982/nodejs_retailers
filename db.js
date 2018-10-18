let mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/test`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.on("open", () => {
    console.log("mongodb connect successfully!");
});