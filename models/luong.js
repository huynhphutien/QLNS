var mongoose = require('mongoose');
var LuongSchema = new mongoose.Schema({
    nhanVien: { type: mongoose.Schema.Types.ObjectId, ref: 'NhanVien', required: true },
    thangNam: { type: String, required: true },
    phuCap: { type: Number, default: 0 },
    thuong: { type: Number, default: 0 },
	ngayCong: { type: Number, default: 0 },
    tongLuong: { type: Number, default: 0 }
  });
var LuongModel = mongoose.model('Luong', LuongSchema);
module.exports = LuongModel;