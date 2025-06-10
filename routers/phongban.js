var express = require('express');
var router = express.Router();
var PhongBan = require('../models/phongban');
// GET: Danh sách phòng ban
router.get('/', async (req, res) => {
	var pb = await PhongBan.find();
		res.render('phongban', {
			title: 'Danh sách phòng ban',
			phongban: pb
		});
});
// GET: Thêm phòng ban
router.get('/them', async (req, res) => {
	res.render('them_phongban', {
		phongban: {},
		title: 'Thêm phòng ban'
	});
});
// POST: Thêm phòng ban
router.post('/them', async (req, res) => {
	var data = {
		tenPhongBan: req.body.tenPhongBan,
		moTa: req.body.moTa
	};
	await PhongBan.create(data);
	res.redirect('/phongban');
});
// GET: Sửa phòng ban
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var pb = await PhongBan.findById(id);
	res.render('sua_phongban', {
		title: 'Sửa phòng ban',
		phongban: pb
	});
});
// POST: Sửa phòng ban
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		tenPhongBan: req.body.tenPhongBan,
		moTa: req.body.moTa
	};
	await PhongBan.findByIdAndUpdate(id, data);
	res.redirect('/phongban');
});
// GET: Xóa phòng ban
router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await PhongBan.findByIdAndDelete(id);
		res.redirect('/phongban');
});
module.exports = router;