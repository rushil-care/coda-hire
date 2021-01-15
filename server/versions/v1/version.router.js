const express = require("express");
const router = express.Router();
const UserRouter = require("./routes/users.router");

router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths

router.use("/users", UserRouter);

module.exports = router;
