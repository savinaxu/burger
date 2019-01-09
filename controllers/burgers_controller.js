const burger = require("../models/burger.js")
const express = require("express")
const router= express.Router()

router.get("/", function(req, res) {
    burger.all(function(data) {
        let hbsObject = {
            burger: data
        }
        res.render("index", hbsObject)
    })
})

module.exports = router

