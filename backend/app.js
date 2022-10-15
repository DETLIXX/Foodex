const express = require("express")
const ejs = require("ejs");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const route = require("./routes/location.js")
app.use("/api", route);

app.listen(process.env.PORT || 3001, () => {
    console.log(`App listening on port!`);
});