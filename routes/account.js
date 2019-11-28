const express = require('express')
const app = express()
const AccountModel = require("../models/account")

// get all user accounts
app.get("/", async (req, res, next) => {
    // query
    const accounts = await AccountModel.find({})

    try {
        if (accounts) {
            // returns status 200 upon succession and all the user accounts
            res.status(200).send(accounts)
        }
    } catch (error) {
        // returns status 500 and error
        res.status(500).send(error)
    }
})

// create user accout
app.post("/", async (req, res, next) => {
    // query
    const account = new AccountModel(req.body)
    console.log(account);

    try {
        if (account) {
            await account.save();
            // returns status code 200 with message
            res.status(201).send(account)
        }
    } catch (err) {
        // returns status code 500 with error message
        res.status(500).send(err)
    }
})

// user login module
app.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    // query
    const loginUser = await AccountModel.findOne({
        username: username
    },
        (err, login) => {
            if (err) throw err
            if (login) {
                login.comparePassword(password, (err, match) => {
                    res.status(200).send({
                        username: loginUser.username,
                        password: loginUser.password
                    })
                })
            }
        }
    )
})


module.exports = app