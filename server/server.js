const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const fuelRoutes = require("./routes/fuel");
const cookieParser = require('cookie-parser')


const app = express().use(cors({ origin: true, credentials: true }));
// app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"*, Origin, set-cookie, X-Requested-With, Content-Type, Accept, Authorization, append, delete,entries,foreach,get,has,keys,set,values"
	);
	res.setHeader("Access-Control-Max-Age", "86400");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Max-Age", 86400);
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	} else {
		next();
	}
});


app.use("/api/users", usersRoutes);
app.use("/api/fuel", fuelRoutes);

// runs when an error is thrown
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500); // 500 means something went wrong on the server
	res.json({ message: error.message || "THERE WAS AN ERROR" });
});

app.get("/*", (req, res) => {
	// res.sendFile(path.join(__dirname, "build", "index.html"));
    // ^^^^ this is for after app is done to host the built react app

	console.log("hello")
    res.status(200).json("welcome")
});

module.exports = app;

