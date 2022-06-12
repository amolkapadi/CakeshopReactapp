const express = require("express");
const cors = require("cors");
require("./Database/config");
const User = require('./Database/User')
const app = express();


app.use(express.json());
app.use(cors());

//registration route
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result =result.toObject();
    delete result.password
    resp.send(result);
})
//login route
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        } else {
            resp.send({ result: "user not found" });
        }
    } else {
        resp.send({ result: "user not found" });

    }

})

app.listen(4000);