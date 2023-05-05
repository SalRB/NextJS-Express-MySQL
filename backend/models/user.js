const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mySQLRequest = require('./mysql.controller');
const sql = require("../config/db.config");
require('dotenv').config();


const list = (req, res) => {
    try {
        const result = mySQLRequest(req, res, "SELECT * FROM users");
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const register = (req, res) => {
    data = req.body;
    data.pfp = 'https://static.productionready.io/images/smiley-cyrus.jpg';
    data.bio = 'Hello, this is my profile.';
    data.passwd = encodePassword(data.passwd);

    try {
        const result = mySQLRequest(req, res,
            `INSERT INTO users (username, email, passwd, pfp, bio)
            VALUES (?, ?, ?, ?, ?);`,
            [data.username, data.email, data.passwd, data.pfp, data.bio]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send({ msg: "Something went wrong", msgType: "error" });
    }
}

const login = (req, res) => {
    data = req.body;
    try {
        sql.query("SELECT username, pfp, passwd, id FROM users WHERE email = ?", data.email, (err, result) => {
            if (err) if (err.errno == 1062) res.status(500).send({ msg: "Email already taken", msgType: "error" })
            if (!result[0]) {
                res.status(500).send({ msg: "Wrong Password", msgType: "error" })
            } else {
                if (validatePassword(data.passwd, result[0].passwd)) {
                    res.status(200).send({ msg: "Login Successful", token: generateJWT(data.email), data: { id: result[0].id, username: result[0].username, email: data.email, pfp: result[0].pfp, bio: result[0].bio, } })
                } else {
                    res.status(500).send({ msg: "Wrong Password", msgType: "error" })
                }
            }
        });
    } catch (e) {
        res.status(500).send({ msg: "Something went wrong", msgType: "error" });
    }
}

const get = (req, res) => {
    const user_id = req.params.user;

    try {
        const result = mySQLRequest(req, res,
            `SELECT id, username, pfp, bio FROM users 
            WHERE id = ?`,
            [user_id]);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}



const userAPI = {
    listAllUsers: list,
    registerUser: register,
    loginUser: login,
    getUser: get,
};


const encodePassword = (password) => {
    return hash = crypto.pbkdf2Sync(password, process.env.SECRET, 10000, 64, 'sha512').toString('hex');
}

const validatePassword = (password, storedPassword) => {
    const hash = crypto.pbkdf2Sync(password, process.env.SECRET, 10000, 64, 'sha512').toString('hex');
    return storedPassword === hash;
}

const generateJWT = (email) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        username: email,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.SECRET);
};








// var UserSchema = new mongoose.Schema({
//     username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
//     email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
//     image: String,
//     hash: String,
//     salt: String,
//     bio: String,
//     following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
// }, {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//     versionKey: false
// });

// // UserSchema.virtual('userProducts',{
// //   ref: 'Product',
// //   localField: 'id',
// //   foreignField: 'seller'
// // })

// UserSchema.plugin(uniqueValidator, { message: '{PATH} is already taken.' });

// UserSchema.methods.validPassword = function (password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
// };

// UserSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UserSchema.methods.generateJWT = function () {
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 60);

//     return jwt.sign({
//         id: this._id,
//         username: this.username,
//         exp: parseInt(exp.getTime() / 1000),
//     }, secret);
// };

// UserSchema.methods.toAuthJSON = function () {
//     return {
//         username: this.username,
//         email: this.email,
//         token: this.generateJWT(),
//         bio: this.bio,
//         image: this.image
//     };
// };

// UserSchema.methods.getFollowing = function () {
//     return this.following.length
// };

// UserSchema.methods.getLikes = function () {
//     return this.favorites.length
// };

// UserSchema.methods.toProfileJSONFor = function (user, followers, comments) {
//     return {
//         username: this.username,
//         image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
//         following: user ? user.isFollowing(this._id) : false,
//         numFollowing: this.getFollowing(),
//         numLikes: this.getLikes(),
//         numFollowers: followers,
//         numComments: comments,
//         bio: this.bio
//     };
// };

// UserSchema.methods.favorite = function (id) {
//     if (this.favorites.indexOf(id) === -1) {
//         this.favorites.push(id);
//     }

//     return this.save();
// };

// UserSchema.methods.unfavorite = function (id) {
//     this.favorites.remove(id);
//     return this.save();
// };

// UserSchema.methods.isFavorite = function (id) {
//     return this.favorites.some(function (favoriteId) {
//         return favoriteId.toString() === id.toString();
//     });
// };

// UserSchema.methods.follow = function (id) {
//     if (this.following.indexOf(id) === -1) {
//         this.following.push(id);
//     }

//     return this.save();
// };

// UserSchema.methods.unfollow = function (id) {
//     this.following.remove(id);
//     return this.save();
// };

// UserSchema.methods.isFollowing = function (id) {
//     return this.following.some(function (followId) {
//         return followId.toString() === id.toString();
//     });
// };

module.exports = userAPI;