/* eslint-disable new-cap */
const mongoose = require("mongoose")
const moment = require("moment")

const dateTime = () => moment(new Date()).format("DD-MM-YYYY")

const limitedResultSchema = mongoose.Schema({
    accountID: {
        type: Number,
        require: true
    },
    date: {
        type: String,
        default: dateTime,
    },
    account: {
        type: String,
    },
    stakes: {
        type: String,
    },
    set: {
        type: String,
    },
    colors: {
        type: String,
    },
    win: {
        type: Number,
        min: 1,
        max: 7,
    },
    lose: {
        type: Number,
        min: 1,
        max: 7,
    },
    goldCost: {
        type: Number,
        min: 0,
        max: 5000,
    },
    gemCost: {
        type: Number,
        min: 0,
        max: 2000,
    },
    gemPrize: {
        type: Number,
        min: 0,
        max: 2200 // to ask AK
    },
    gemGrind: {
        type: Number,
        min: 0,
    },
    gemNet: {
        type: Number,
        min: 0
    },
    deck: {
        type: String,
    },
    remark: {
        type: String
    }
})

const limitedResult = mongoose.model("limitedResult", limitedResultSchema, "Limited Result")

module.exports = limitedResult