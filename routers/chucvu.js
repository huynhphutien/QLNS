var express = require('express');
var router = express.Router();
var ChucVu = require('../models/chucvu');
// GET: Danh sách chức vụ
router.get('/', async (req, res) => {
	var cv = await ChucVu.find();
		res.render('chucvu', {
			title: 'Danh sách chức vụ',
			chucvu: cv
		});
});
// GET: Thêm chức vụ
router.get('/them', async (req, res) => {
	res.render('them_chucvu', {
		title: 'Thêm chức vụ'
	});
});
// POST: Thêm chức vụ
router.post('/them', async (req, res) => {
	var data = {
		tenChucVu: req.body.tenChucVu
	};
	await ChucVu.create(data);
	res.redirect('/chucvu');
});
// GET: Sửa chức vụ
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var cv = await ChucVu.findById(id);
	res.render('sua_chucvu', {
		title: 'Sửa chức vụ',
		chucvu: cv
	});
});
// POST: Sửa chức vụ
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		tenChucVu: req.body.tenChucVu
	};
	await ChucVu.findByIdAndUpdate(id, data);
	res.redirect('/chucvu');
});
// GET: Xóa chức vụ
router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await ChucVu.findByIdAndDelete(id);
		res.redirect('/chucvu');
});
module.exports = router;var express = require('express');
var router = express.Router();
var ChucVu = require('../models/chucvu');
// GET: Danh sách chức vụ
router.get('/', async (req, res) => {
	var cv = await ChucVu.find();
		res.render('chucvu', {
			title: 'Danh sách chức vụ',
			chucvu: cv
		});
});
// GET: Thêm chức vụ
router.get('/them', async (req, res) => {
	res.render('them_chucvu', {
		chucvu: {},
		title: 'Thêm chức vụ'
	});
});
// POST: Thêm chức vụ
router.post('/them', async (req, res) => {
	var data = {
		tenChucVu: req.body.tenChucVu
	};
	await ChucVu.create(data);
	res.redirect('/chucvu');
});
// GET: Sửa chức vụ
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var cv = await ChucVu.findById(id);
	res.render('sua_chucvu', {
		title: 'Sửa chức vụ',
		chucvu: cv
	});
});
// POST: Sửa chức vụ
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		tenChucVu: req.body.tenChucVu
	};
	await ChucVu.findByIdAndUpdate(id, data);
	res.redirect('/chucvu');
});
// GET: Xóa chức vụ
router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await ChucVu.findByIdAndDelete(id);
		res.redirect('/chucvu');
});
module.exports = router;