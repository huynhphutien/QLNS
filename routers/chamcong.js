var express = require('express');
var router = express.Router();
var ChamCong = require('../models/chamcong');
var NhanVien = require('../models/nhanvien');
// GET: Danh sách chấm công
router.get('/', async (req, res) => {
	var chamcong = await ChamCong.find().populate('nhanVien');
		res.render('chamcong', {
			title: 'Danh sách chấm công',
			chamcong: chamcong
		});
});
// GET: Thêm chấm công cho nhân viên
router.get('/them', async (req, res) => {
	var nv = await NhanVien.find();
	res.render('them_chamcong', {
		nhanvien: nv,
		title: 'Chấm công cho nhân viên'
	});
});
// POST: Thêm chấm công cho nhân viên
router.post('/them', async (req, res) => {
	var data = {
		nhanVien: req.body.MaNhanVien,
		ngay: req.body.ngay,
		gioVao: req.body.gioVao,
		gioRa: req.body.gioRa,
        ghiChu: req.body.ghiChu,
        soGioLam: req.body.soGioLam		
	};
	await ChamCong.create(data);
	res.redirect('/chamcong');
});
// GET: Sửa chấm công
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var nv = await NhanVien.find();
	var chamcong = await ChamCong.findById(id);
	res.render('sua_chamcong', {
		title: 'Sửa chấm công',
		nhanvien: nv,
	    chamcong: chamcong
	});
});
// POST: Sửa chấm công
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		nhanVien: req.body.nhanVien,
		ngay: req.body.ngay,
		gioVao: req.body.gioVao,
		gioRa: req.body.gioRa,
        ghiChu: req.body.ghiChu	
	};
	await ChamCong.findByIdAndUpdate(id, data);
	res.redirect('/chamcong');
});
// GET: Xóa chấm công
router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await ChamCong.findByIdAndDelete(id);
		res.redirect('/chamcong');
});
module.exports = router;