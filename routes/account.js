const express = require('express')
const app = express()
const accountModel = require("../models/account")

// get all user for the admin for manage
app.get("/", async (req, res, next) => {
    // query
    const getAllAccounts = await accountModel.find({})
    try {
        if (getAllAccounts) {
            // returns status 200 and the accounts
            res.status(200).send(getAllAccounts)
        }
    }
    catch (err) {
        // returns status 500 as well as error in the console
        res.status(500).send(err)
    }
})

// create new user account
app.post("/", async (req, res, next) => {
    // query
    // const createAccount = await accountModel(req.body)
    console.log(req.body)
    // try {
    //     if (createAccount) {
    //         // returns status 201 if the creation succeeds
    //         res.status(201).send("Account successfully created")
    //     }
    // }
    // catch (err) {
    //     // returns status 500 as well as the error in the console
    //     res.status(500).send(err)
    // }
})

// user login module
app.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    // query
    const login = await accountModel.findOne({
        username: username
    }, (err, user) => {
        if (err) throw err
        if (user) {
            user.comparePassword(password, (err, match) => {
                res.status(200).send({
                    username: login.username,
                    password: login.password
                })
            })
        }
    })
})

module.exports = app