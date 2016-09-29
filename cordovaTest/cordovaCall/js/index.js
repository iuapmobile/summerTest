summerready = function() {
		openFrame('codorva调用','codorva','html/codorva.html')
}
function openFrame(title,name, url) {

	var y = $summer.offset($summer.byId('header')).h;
	var width = $summer.offset(document.getElementsByTagName("body")[0]).w;
	var height = $summer.offset($summer.byId('main')).h;
	$('h3').html(title);
	summer.openFrame({
		name : name,
		url : url,
		bounces : true,
		rect : {
			x : 0,
			y : y,
			w : width,
			h : height
		}
	});

}