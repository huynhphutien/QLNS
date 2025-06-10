var mongoose = require('mongoose');
var tinTucsuKienSchema = new mongoose.Schema({
    tieuDe: { type: String, required: true },
    noiDung: { type: String, required: true },
    loai: {
       type: String,
       enum: ['Tin tức'],
       default: 'Tin tức'
     },
    hinhAnh: { type: String },
    ngayDang: { type: Date, default: Date.now },
});
var tinTucsuKienModel = mongoose.model('TinTucSuKien', tinTucsuKienSchema);
module.exports = tinTucsuKienModel;