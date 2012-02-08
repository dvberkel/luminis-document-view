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

    // We create a document model. The `markdown` property is set to a
    // default invitation to select a document.
    var DocumentModel = Backbone.Model.extend({
	defaults: { markdown: "Select a **document** from the tree." },
    });
    
    // We create a document view which will render the document model.
    var DocumentView = Backbone.View.extend({
	initialize: function(){
	    // ensure that the context for the render method is this
	    // document view.
	    _.bindAll(this, 'render');
	    
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
    });
})(jQuery);