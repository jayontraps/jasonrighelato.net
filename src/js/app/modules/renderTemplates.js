module.exports = function renderTemplates(data) {

	console.log("renderTemplates");

	var slug = data.slug;
	var imageUrl = data.acf.header_image.url;

	function onComplete() {
		$(".hero").css("background-image","url("+ imageUrl +")");
		
		console.log(imageUrl);
	};

	$("#js_page_single_item").removeClass().addClass(slug);

	$("#js_page_single_item").loadTemplate($("#itemTemplate"), {

       "title" : data.title.rendered,
       "intro" : data.acf.long_description,
       "heroImage" : data.acf.header_image.url}, 
       { complete: onComplete });	

};