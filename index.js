const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");

const app = express();

app.set('view engine', 'ejs');

const port = 5000;
app.listen(port, () => {
    console.log(`server running on Port: ${port}`);
})