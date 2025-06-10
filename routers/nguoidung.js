var express = require('express');
var router = express.Router();
var NguoiDung = require('../models/nguoidung');
// GET: Danh sách nhân viên
router.get('/', async (req, res) => {
var nd = await NguoiDung.find();
	res.render('nguoidung', {
		title: 'Danh sách người dùng',
		nguoidung: nd
	});
});
// GET: Thêm nhân viên
router.get('/them', async (req, res) => {
    res.render('nguoidung_them', {
		title: 'Thêm người dùng'
	})
});
// POST: Thêm nhân viên
router.post('/them', async (req, res) => {
     var data = {
		MaSoNhanVien: req.body.MaSoNhanVien,
		HoVaTen: req.body.HoVaTen,
		Email: req.body.Email,
		SDT: req.body.HinhAnh,
		ChucVu: req.body.TenDangNhap,
		PhongBan: req.body.PhongBan
	};
	await NguoiDung.create(data);
	res.redirect('/nguoidung');
});
// GET: Sửa nhân viên
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var nd = await NguoiDung.findById(id);
	res.render('nguoidung_sua', {
		title: 'Sửa người dùng',
		nguoidung: nd
	});

});
// POST: Sửa nhân viên
router.post('/sua/:id', async (req, res) => {
	  var id = req.params.id;
      var data = {
		MaSoNhanVien: req.body.MaSoNhanVien,
		HoVaTen: req.body.HoVaTen,
		Email: req.body.Email,
		SDT: req.body.HinhAnh,
		ChucVu: req.body.TenDangNhap,
		PhongBan: req.body.PhongBan
	};
	
	await NguoiDung.findByIdAndUpdate(id, data);
	res.redirect('/nguoidung');
});
// GET: Xóa nhân viên
router.get('/xoa/:id', async (req, res) => {
    var id = req.params.id;
	await NguoiDung.findByIdAndDelete(id);
	res.redirect('/nguoidung');

});
module.exports = router;