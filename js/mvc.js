// We are using
// [backbone.js](documentcloud.github.com/backbone/ "Backbone Website")
// to modularize the application by using the model-view-controller
// ([MVC](en.wikipedia.org/wiki/Model–view–controller "Wikipedia on MVC"))
// design pattern.

// An self executing function to limit the scope of variables and have
// prestine values for `$` and `undefined`.
(function($,undefined){
    // The markdown converter provided by the
    // [pagedown](http://code.google.com/p/pagedown/ "Pagedown at Google Code")
    // library is used
    var converter = new Markdown.Converter();

    // We create a document model. 
    var DocumentModel = Backbone.Model.extend({
	// The `markdown` property is set to a default invitation to select a document.
	defaults: { markdown: "Select a **document** from the tree." },
	
	loadDocument: function(documentUrl) {
	    // The default "document" is reporting an unsuccessfull fetch.
	    var result = "could **not** load " + documentUrl;
	    // Make a synchronous ajax call to fetch the document at `documentUrl`.
	    $.ajax({
		url: documentUrl,
		dataType: "text",
		success: function(data){ result = data; },
		async: false
	    });
	    // Set the document in the `markdown` property.
	    this.set({markdown: result});	    
	}
    });
    
    // We create a document view which will render the document model.
    var DocumentView = Backbone.View.extend({
	initialize: function(){
	    // ensure that the context for the render method is this
	    // document view.
	    _.bindAll(this, 'render');
	    
	    // Listen for `change:markdown` events from the
	    // model. Render the view accordingly.
	    this.model.bind("change:markdown", function(){
		this.render();
	    }, this);
	    
	    // Render yourself so a user sees the default message.
	    this.render();
	},
	
	// Render the document by converting the markdown into html.
	render: function(){
	    $(this.el).html(converter.makeHtml(this.model.get("markdown")));
	}
    });
    
    // After the document is loaded...
    $(function(){
	// ... create a model and a corresponding view.
	var documentModel = new DocumentModel();
	new DocumentView({el: $("#mvc-port"), model: documentModel});
	
	// The tree is a *implicit* controller. Foreach document in the
	// tree...
	$("#mvc-selection li").each(function(){
	    var element = $(this);
	    // ... bind the click event to `loadDocument` method of
	    // `documentModel`.
	    element.click(function(){
		documentModel.loadDocument(element.attr('href'));
	    });
	});
    });
})(jQuery);