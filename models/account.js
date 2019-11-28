/* eslint-disable new-cap */
// require modules
const mongoose = require("mongoose")
const moment = require("moment")

const dateTime = () => moment(new Date()).format("DD-MMM-YYYY_HH:mm:ss")

// schema declaration
const accountSchema = mongoose.Schema({
    accountID: {
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        require: true,
        default: dateTime
    }
});

accountSchema.pre("save", function (next) {
    const account = this;

    // only hash the password if it has been modified (or is new)
    if (!account.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(account.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            account.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) =>
        callback(err, isMatch)
    );
};


const accountModel = mongoose.model("Accounts", accountSchema, "Accounts")

// export the model
module.exports = accountModel