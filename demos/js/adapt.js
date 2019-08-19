function adapt(w){
	var winWidth = $(window).width();
	var font_size = (winWidth / w) * 20;
	$('html').css('font-size', font_size);
}


