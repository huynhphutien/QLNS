function firstImage(noiDung) {
	var regExp = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
	var results = regExp.exec(noiDung);
	var image = 'https://trangtin-8kr3.onrender.com/images/noimage.png';
	if(results) image = results[1];
	return image;
}

module.exports = firstImage;
