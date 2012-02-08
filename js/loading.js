// We are dynamically loading documents from the server. The documents
// are [markdown](http://daringfireball.net/projects/markdown/ "Markdown website")
// which will be transformed into html.

// An self executing function to limit the scope of variables and have
// prestine values for `$` and `undefined`.
(function($,undefined){
    // The markdown converter provided by the
    // [pagedown](http://code.google.com/p/pagedown/ "Pagedown at Google Code")
    // library is used
    var converter = new Markdown.Converter();
    
    // We define a function which will load the document at
    // `documentUrl` into the `selector` container.
    var showDocument = function(documentUrl, selector) {
	$(selector).html(converter.makeHtml(loadDocument(documentUrl)));
    }
    
    // A function which is responsible for loading the document from
    // the server.
    var loadDocument = function(documentUrl) {
	// The default "document" is reporting an unsuccessfull fetch.
	var result = "could **not** load " + documentUrl;
	// Make a synchronous ajax call to fetch the document at `documentUrl`
	$.ajax({
	    url: documentUrl,
	    dataType: "text",
	    success: function(data){ result = data; },
	    async: false
	});
	return result;
    }
    
    // After the document is loaded...
    $(function(){
	// .. for each document in the tree ...
	$("#loading-selection li").each(function(){
	    var element = $(this);
	    // .. bind the click event to `showDocument` function.
	    element.click(function(){
		showDocument(element.attr('href'), "#loading-port");
	    });
	});
    });
})(jQuery);