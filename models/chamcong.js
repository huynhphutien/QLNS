var mongoose = require('mongoose');
var chamCongSchema = new mongoose.Schema({
  nhanVien: { type: mongoose.Schema.Types.ObjectId, ref: 'NhanVien', required: true },
  ngay: { type: Date, required: true },
  gioVao: { type: String },
  gioRa: { type: String },
  ghiChu: { type: String },
  soGioLam: { type: Number, default: 0 }
  });
  // Tạo Middleware để tính số giờ làm

  chamCongSchema.pre('save', function (next) {
  if (this.gioVao && this.gioRa) {
    const [h1, m1] = this.gioVao.split(':').map(Number);
    const [h2, m2] = this.gioRa.split(':').map(Number);

    const vao = new Date(0, 0, 0, h1, m1);
    const ra = new Date(0, 0, 0, h2, m2);

    const diffMs = ra - vao;
    this.soGioLam = diffMs > 0 ? Math.round(diffMs / (1000 * 60 * 60) * 100) / 100 : 0;
  } else {
    this.soGioLam = 0;
  }
  next();
});
var chamCongModel = mongoose.model('ChamCong', chamCongSchema);
module.exports = chamCongModel;