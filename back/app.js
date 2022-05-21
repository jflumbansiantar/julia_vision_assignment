const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes");

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors());

// routes
app.use("/api", route);

// server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening to ${PORT}`));
