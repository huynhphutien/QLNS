var mongoose = require('mongoose');
var chucVuSchema = new mongoose.Schema({
   tenChucVu: { type: String, required: true, unique: true }
});
var chucVuModel = mongoose.model('ChucVu', chucVuSchema);
module.exports = chucVuModel;