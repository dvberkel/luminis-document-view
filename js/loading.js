(function($,undefined){
    var converter = new Markdown.Converter();
    
    var showDocument = function(documentUrl, selector) {
	$(selector).html(converter.makeHtml(loadDocument(documentUrl)));
    }
    
    var loadDocument = function(documentUrl) {
	var result = "could **not** load " + documentUrl;
	$.ajax({
	    url: documentUrl,
	    dataType: "text",
	    success: function(data){ result = data; },
	    async: false
	});
	return result;
    }

    $(function(){
	$("#loading-selection li").each(function(){
	    var element = $(this);
	    element.click(function(){
		showDocument(element.attr('href'), "#loading-port");
	    });
	});
    });
})(jQuery);