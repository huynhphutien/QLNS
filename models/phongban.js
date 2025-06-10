var mongoose = require('mongoose');
var phongBanSchema = new mongoose.Schema({
 tenPhongBan: { type: String, unique: true, require: true },
 moTa: {type: String}
});
var phongBanModel = mongoose.model('PhongBan', phongBanSchema);
module.exports = phongBanModel;