const mongoose = require('mongoose');
const TestinomialSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    role: {
        type: String,
    },
    description: {
        type: String,
    }
})

const TestinomialModel = mongoose.model('Users_Testinomials', TestinomialSchema);
module.exports = TestinomialModel;