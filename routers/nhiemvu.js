var express = require('express');
var router = express.Router();
var NhiemVu = require('../models/nhiemvu');
var NhanVien = require('../models/nhanvien'); 

// GET: Danh sách nhiệm vụ
router.get('/', async (req, res) => {
  var nv = await NhiemVu.find()
    .populate('nhanVien', 'fullName')
    .sort({ ngayGiao: -1 });

  res.render('nhiemvu', {
    title: 'Danh sách nhiệm vụ',
    nhiemvu: nv
  });
});

// GET: Form thêm nhiệm vụ
router.get('/them', async (req, res) => {
	var nv = await NhiemVu.find();
  var dsNhanVien = await NhanVien.find({}, 'hoTen');
  res.render('nhiemvu_them', {
    title: 'Thêm nhiệm vụ',
    dsNhanVien,
	 nhiemvu: nv
  });
});

// POST: Thêm nhiệm vụ
router.post('/them', async (req, res) => {
  var data = {
    tieuDe: req.body.tieuDe,
    moTa: req.body.moTa,
    mucDoUuTien: req.body.mucDoUuTien,
    trangThai: req.body.trangThai,
    ngayGiao: req.body.ngayGiao,
    hanHoanThanh: req.body.hanHoanThanh,
    nhanVien: req.body.nhanVien,
    tepDinhKem: req.body.tepDinhKem
  };

  await NhiemVu.create(data);
  res.redirect('/nhiemvu');
});

// GET: Form sửa nhiệm vụ
router.get('/sua/:id', async (req, res) => {
  var id = req.params.id;
  var nhiemvu = await NhiemVu.findById(id);
  var dsNhanVien = await NhanVien.find({}, 'fullName');
  res.render('nhiemvu_sua', {
    title: 'Sửa nhiệm vụ',
    nhiemvu,
    dsNhanVien
  });
});

// POST: Cập nhật nhiệm vụ
router.post('/sua/:id', async (req, res) => {
  var id = req.params.id;
  var data = {
    tieuDe: req.body.tieuDe,
    moTa: req.body.moTa,
    mucDoUuTien: req.body.mucDoUuTien,
    trangThai: req.body.trangThai,
    ngayGiao: req.body.ngayGiao,
    hanHoanThanh: req.body.hanHoanThanh,
    nhanVien: req.body.nhanVien,
    tepDinhKem: req.body.tepDinhKem
  };

  await NhiemVu.findByIdAndUpdate(id, data);
  res.redirect('/nhiemvu');
});

// GET: Xoá nhiệm vụ
router.get('/xoa/:id', async (req, res) => {
  var id = req.params.id;
  await NhiemVu.findByIdAndDelete(id);
  res.redirect('/nhiemvu');
});

module.exports = router;
