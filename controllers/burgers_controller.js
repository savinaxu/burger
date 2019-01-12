const burger = require("../models/burger.js")
const express = require("express")
const router= express.Router()

router.get("/", function(req, res) {
    burger.all(function(data) {
        console.log(data)
        let hbsObject = {
            burgers: data
        }
        res.render("index", hbsObject)
    })
})

router.put("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;
    burger.update({
        devoured: req.body.devoured
    }, 
    condition, function(result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], 
    [
        req.body.burger_name, JSON.parse(req.body.devoured)
    ], 
    function(result) {
        res.json({ id: result.insertId });
    });
});
    

module.exports = router

