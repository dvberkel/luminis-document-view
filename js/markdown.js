// Markdown.js is used to transform all markdown into html. By giving
// an element a class *markdown* it is eligble for transformation.

// We are using jQuery to execute the conversion after the document is loaded.
$(function(){
    // The markdown converter provided by the
    // [pagedown](http://code.google.com/p/pagedown/ "Pagedown at Google Code")
    // library is used
    var converter = new Markdown.Converter();
    
    // Select all element with a class *markdown*...
    $(".markdown").each(function(){
        var element = $(this);
	// ... and transform their content into html.
        element.html(converter.makeHtml(element.text()));
    });
});