const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const usersRoutes = require("./routes/users");


const app = express().use(cors({ origin: true, credentials: true }));
// app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
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
    console.log("hello")
    res.status(200).json("welcome")
});



app.listen(5000);
