const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    coins: { type: Number, default: 0 },
    bank: { type: Number, default: 0 }
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;