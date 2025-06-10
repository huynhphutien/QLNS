var express = require('express');
var router = express.Router();
var BaoCao = require('../models/baocao');
var NhanVien = require('../models/nhanvien');
// GET: Danh sách báo cáo
router.get('/', async (req, res) => {
	var baocao = await BaoCao.find().populate('nhanVien');
		res.render('baocao', {
			title: 'Danh sách các báo cáo',
			baocao: baocao
		});
});
// GET: Thêm mới báo cáo
router.get('/them', async (req, res) => {
	var nv = await NhanVien.find();
	res.render('baocao_them', {
		title: 'Thêm mới báo cáo',
		nhanvien: nv
	});
});
// POST: Thêm mới báo cáo
router.post('/them', async (req, res) => {
	var data = {
		nhanVien: req.body.nhanVien,
		thangNam: req.body.thangNam,
		doanhThu: req.body.doanhThu,
		noiDung: req.body.noiDung,
        ngayTao: req.body.ngayTao		
	};
	await BaoCao.create(data);
	res.redirect('/baocao');
});
// GET: Sửa báo cáo
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var baocao = await BaoCao.findById(id);
	var nv = await NhanVien.find();
	res.render('baocao_sua', {
		title: 'Sửa báo cáo',
	    baocao: baocao,
		nhanvien: nv
	});
});
// POST: Sửa báo cáo
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		nhanVien: req.body.nhanVien,
		thangNam: req.body.thangNam,
		doanhThu: req.body.doanhThu,
		noiDung: req.body.noiDung,
        ngayTao: req.body.ngayTao
	};
	await BaoCao.findByIdAndUpdate(id, data);
	res.redirect('/baocao');
});
// GET: Xóa báo cáo
router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await BaoCao.findByIdAndDelete(id);
		res.redirect('/baocao');
});
module.exports = router;