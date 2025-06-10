
var mongoose = require('mongoose');

var nhiemVuSchema = new mongoose.Schema({
  tieuDe: { type: String, required: true },
  moTa: { type: String, required: true },
  mucDoUuTien: {
    type: String,
    enum: ['Thấp', 'Trung bình', 'Cao'],
    default: 'Trung bình'
  },
  trangThai: {
    type: String,
    enum: ['Chưa bắt đầu', 'Đang thực hiện', 'Hoàn thành', 'Tạm hoãn'],
    default: 'Chưa bắt đầu'
  },
  ngayGiao: { type: Date, default: Date.now },
  hanHoanThanh: { type: Date },

  nhanVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NhanVien'
  },

  tepDinhKem: { type: String } 
});

var nhiemvuModel = mongoose.model('NhiemVu', nhiemVuSchema);
module.exports = nhiemvuModel;
