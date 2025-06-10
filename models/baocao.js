var mongoose = require('mongoose');
var baocaoSchema = new mongoose.Schema({
    nhanVien: { type: mongoose.Schema.Types.ObjectId, ref: 'NhanVien'},
    thangNam: { type: Date, required: true },
    doanhThu: { type: Number, required: true },
    noiDung: { type: String },
    ngayTao: { type: Date, default: Date.now }
});
var baocaoModel = mongoose.model('BaoCao', baocaoSchema);
module.exports = baocaoModel;