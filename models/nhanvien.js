var mongoose = require('mongoose');
var nhanVienSchema = new mongoose.Schema({
    hoTen: { type: String, required: true },
    ngaySinh: { type: Date },
    gioiTinh: { type: String, enum: ['Nam', 'Nữ', 'Khác'] },
    soDienThoai: { type: String },
    email: { type: String },
    diaChi: { type: String },
    phongBan: { type: mongoose.Schema.Types.ObjectId, ref: 'PhongBan' },
    chucVu: { type: mongoose.Schema.Types.ObjectId, ref: 'ChucVu' },
    ngayVaoLam: { type: Date },
    trangThai: { type: String, enum: ['Đang làm', 'Nghỉ việc', 'Nghỉ phép'], default: 'Đang làm' },
	luongCoBan: { type: Number, required: true }

});
var nhanVienModel = mongoose.model('NhanVien', nhanVienSchema);
module.exports = nhanVienModel;