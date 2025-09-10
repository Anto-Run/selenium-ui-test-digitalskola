const express = require("express");
const app = express();

app.get("/", (req, res) => {

    res.send("Hello from Dockerize Node App - Runanto!");

});

const PORT = 3000;
app.listen(PORT, () => {

    console.log(`Server running on https://localhost:${PORT}`);
});