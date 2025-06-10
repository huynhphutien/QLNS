const express = require('express');
const router = express.Router();
const Luong = require('../models/luong');
const ChamCong = require('../models/chamcong');
const NhanVien = require('../models/nhanvien');

// GET: Danh sách lương
router.get('/', async (req, res) => {
  try {
    const luongList = await Luong.find().populate('nhanVien');
    res.render('luong', {
      title: 'Danh sách lương',
      luong: luongList
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Lỗi khi tải danh sách lương");
  }
});

// GET: Tính lương - hiển thị form
router.get('/tinh', async (req, res) => {
  try {
    const nvList = await NhanVien.find();
    res.render('tinh_luong', {
      title: 'Tính lương nhân viên',
      nhanvien: nvList
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Lỗi khi tải nhân viên");
  }
});

// POST: Tính lương
  router.post('/tinh', async (req, res) => {
  try {
    const { MaNhanVien, thangNam, phuCap = 0, thuong = 0, ngayCong=0} = req.body;

    // 1. Kiểm tra định dạng
    if (!MaNhanVien || !/^\d{4}-\d{2}$/.test(thangNam)) {
      return res.status(400).send("❌ Thiếu thông tin hoặc định dạng tháng-năm không hợp lệ.");
    }

    // 2. Tìm nhân viên
    const nhanVien = await NhanVien.findById(MaNhanVien);
    if (!nhanVien) {
      return res.status(404).send("❌ Không tìm thấy nhân viên.");
    }

    const luongCoBan = nhanVien.luongCoBan ;

    // 3. Tạo khoảng ngày để lọc chấm công
    const startDate = new Date(`${thangNam}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    //Tính lương
    const tongLuong = (Number(ngayCong) * luongCoBan) + Number(phuCap) + Number(thuong);
    const data = {
      nhanVien: MaNhanVien,
      thangNam,
      phuCap,
      thuong,
	  ngayCong,
      tongLuong
    };
    await Luong.create(data);

     res.redirect('/luong');
  } catch (err) {
    console.error("Lỗi khi tính lương:", err);
    res.status(500).send(`❌ Lỗi hệ thống: ${err.message}`);
  }
});

// GET: Xóa bản ghi lương
router.get('/xoa/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Luong.findByIdAndDelete(id);
    res.redirect('/luong');
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Lỗi khi xóa lương");
  }
});

module.exports = router;
