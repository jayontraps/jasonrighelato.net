var fireTransition = require('./fireTransition');

module.exports = function renderTemplates(data) {

	var slug = data.slug;
	var imageUrl = data.acf.header_image.url;

	function onComplete() {

		console.log('template rendered!');
		// All set.. 
		fireTransition();
	}

	$("#js_page_single_item").removeClass().addClass(slug);

	$("#js_page_single_item").loadTemplate($("#itemTemplate"), {

		"title" : data.title.rendered,
		"intro" : data.acf.long_description,
		"heroImage" : data.acf.header_image.url,
		"image_1" : data.acf.image_1.url,
		"image_2" : data.acf.image_2.url,
		"btnText" : "Visit the site",
		"btnLink" : data.acf.site_url
   		}, { complete: onComplete });	

};