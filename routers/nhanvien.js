var express = require('express');
var router = express.Router();
var NhanVien = require('../models/nhanvien');
var PhongBan = require('../models/phongban');
var ChucVu = require('../models/chucvu');
// GET: Danh sách chủ đề
router.get('/', async (req, res) => {
	var nv = await NhanVien.find().populate('phongBan')
	                               .populate('chucVu');
	
		res.render('nhanvien', {
			title: 'Danh sách nhân viên',
			nhanvien: nv
		});
});
// GET: Thêm chủ đề
router.get('/them', async (req, res) => {
	var pb = await PhongBan.find();
	var cv = await ChucVu.find();
	res.render('nhanvien_them', {
		nhanvien: {},
		phongban: pb,
		chucvu: cv,
		title: 'Thêm nhân viên'
	});
});
// POST: Thêm chủ đề
router.post('/them', async (req, res) => {
	var data = {
		hoTen: req.body.hoTen,
		ngaySinh: req.body.ngaySinh,
	    gioiTinh: req.body.gioiTinh,
		soDienThoai: req.body.soDienThoai,
		email: req.body.email,
		diaChi: req.body.diaChi,
		phongBan: req.body.tenPhongBan,
	    chucVu: req.body.tenChucVu,
		ngayVaoLam: req.body.ngayVaoLam,
		trangThai: req.body.trangThai,
		luongCoBan: req.body.luongCoBan
	};
	await NhanVien.create(data);
	res.redirect('/nhanvien');
});
// GET: Sửa chủ đề
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var pb = await PhongBan.find();
	var cv = await ChucVu.find();
	var nv = await NhanVien.findById(id);
	res.render('nhanvien_sua', {
		title: 'Sửa nhân viên',
		phongban: pb,
		chucvu: cv,
		nhanvien: nv
	});
});
// POST: Sửa chủ đề
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		hoTen: req.body.hoTen,
		ngaySinh: req.body.ngaySinh,
	    gioiTinh: req.body.gioiTinh,
		soDienThoai: req.body.soDienThoai,
		email: req.body.email,
		diaChi: req.body.diaChi,
		phongBan: req.body.phongBan,
	    chucVu: req.body.chucVu,
		ngayVaoLam: req.body.ngayVaoLam,
		trangThai: req.body.trangThai,
		luongCoBan: req.body.luongCoBan
	};
	await NhanVien.findByIdAndUpdate(id, data);
	res.redirect('/nhanvien');
});
// GET: Xóa chủ đề
router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await NhanVien.findByIdAndDelete(id);
		res.redirect('/nhanvien');
});
module.exports = router;