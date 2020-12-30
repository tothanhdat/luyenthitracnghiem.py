const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TestpfSchema = new Schema({
    name: String, 
    cuisine: String,
    stars: String,
});

const TESTPF_MODEL = mongoose.model('testpf', TestpfSchema);
module.exports  = TESTPF_MODEL;