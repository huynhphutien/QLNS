var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');


var indexRouter = require('./routers/index');
var chudeRouter = require('./routers/chude');
var authRouter = require('./routers/auth');
var taikhoanRouter = require('./routers/taikhoan');
var baivietRouter = require('./routers/baiviet');
var nhanvienRouter = require('./routers/nhanvien');
var tintucsukienRouter = require('./routers/tintucsukien');
var baocaoRouter = require('./routers/baocao');
var nhiemvuRouter = require('./routers/nhiemvu');
var chucvuRouter = require('./routers/chucvu');
var phongbanRouter = require('./routers/phongban');
var chamcongRouter = require('./routers/chamcong');
var luongRouter = require('./routers/luong');




var uri = 'mongodb+srv://sangop12:sangop12@cluster0.gbvaye9.mongodb.net/trangquanly';
mongoose.connect(uri).catch(err => console.log(err));

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
 name: 'iMana', 
 secret: 'abcde', 
 resave: false,
 saveUninitialized: true,
 cookie: {
 maxAge: 30 * 24 * 60 * 60 * 1000 
 }
}));
app.use((req, res, next) => {

 res.locals.session = req.session;

 
 var err = req.session.error;
 var msg = req.session.success;


 delete req.session.error;
 delete req.session.success;


 res.locals.message = '';
 if (err) res.locals.message = '<span class="text-danger">' + err + '</span>';
 if (msg) res.locals.message = '<span class="text-success">' + msg + '</span>';

 next();
});


app.use('/', indexRouter);
app.use('/chude', chudeRouter);
app.use('/', authRouter);
app.use('/taikhoan', taikhoanRouter);
app.use('/baiviet', baivietRouter);
app.use('/nhanvien', nhanvienRouter);
app.use('/tintucsukien', tintucsukienRouter);
app.use('/baocao', baocaoRouter);
app.use('/nhiemvu', nhiemvuRouter);
app.use('/chucvu', chucvuRouter);
app.use('/phongban', phongbanRouter);
app.use('/chamcong', chamcongRouter);
app.use('/luong', luongRouter);



app.listen(3000, () =>{
	console.log('Server đang chạy tại cổng http://127.0.0.1:3000');
});
