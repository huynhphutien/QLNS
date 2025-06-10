var express = require('express');
var router = express.Router();
var TinTucSuKien = require('../models/tintucsukien');
router.get('/', async (req, res) => {
	var tinTuc = await TinTucSuKien.find({
        loai: { $in: ['Tin tức'] },
    }).sort({ ngayDang: -1 });
    res.render('tintucsukien', {
        title: 'Danh sách tin tức',
        tinTuc: tinTuc
    });
});
// GET: Thêm tin tức hoặc sự kiện
router.get('/them', async (req, res) => {
	res.render('them_tintucsukien', {
		title: 'Thêm tin tức hoặc sự kiện'
	});
});

router.post('/them', async (req, res) => {
	var data = {
		tieuDe: req.body.tieuDe,
		noiDung: req.body.noiDung,
		loai: req.body.loai,
		hinhAnh: req.body.hinhAnh,
		ngayDang: req.body.ngayDang
	};
	await TinTucSuKien.create(data);
	res.redirect('/tintucsukien');
});
// GET: Sửa phòng ban
router.get('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var ttsk = await TinTucSuKien.findById(id);
	res.render('sua_tintucsukien', {
		title: 'Sửa tin tức hoặc sự kiện',
		ttsk: ttsk
	});
});
// POST: Sửa phòng ban
router.post('/sua/:id', async (req, res) => {
	var id = req.params.id;
	var data = {
		tieuDe: req.body.tieuDe,
		noiDung: req.body.noiDung,
		loai: req.body.loai,
		hinhAnh: req.body.hinhAnh,
		ngayDang: req.body.ngayDang
	};
	await TinTucSuKien.findByIdAndUpdate(id, data);
	res.redirect('/tintucsukien');
});

router.get('/xoa/:id', async (req, res) => {
	var id = req.params.id;
		await TinTucSuKien.findByIdAndDelete(id);
		res.redirect('/tintucsukien');
});
module.exports = router;