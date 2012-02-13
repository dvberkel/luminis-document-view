// This file will load the document tree menu from the server.
// This is achieved by a preprocessing step in which the `documents` directory is
// read and reproduced in a json structure.

// We are using a self evaluating function for two reasons. To limit the scope of
// defined variable and be certain of the variables `$` and `undefined`.
(function($,undefined){
    // A `DocumentLeaf` is a model for the various documents receiding on the server.
    var DocumentLeaf = Backbone.Model.extend({
	defaults: { documentUrl: "documents/missing.md", name: "enter a name"}
    });
    
    // A collection of `DocumentLeaf`s
    var DocumentLeafs = Backbone.Collection.extend({
	model: DocumentLeaf    
    });   

    var DocumentTreeView = Backbone.View.extend({
	// Define a template for one model element.
	template: _.template("<li href='<%= documentUrl %>'><%= name %></li>"),

	initialize: function(){
	    // Bind the context of the render method to this view object.
	    _.bindAll(this, 'render');
	    
	    // render yourself
	    this.render();
	},
	
	// render the view on screen.
	render: function(){
	    $(this.el).html(this.template({documentUrl: 'documents/document1.md', name: 'document 1'}));
	}
    });

    // After the document is loaded...
    $(function(){
	// ... create a document model and corresponding view.
	var documentModel = new DocumentModel();
	new DocumentView({el: $("#dynamic-port"), model: documentModel});
	
	// Create a document tree view.
	documentTreeView = new DocumentTreeView({el: $("#dynamic-selection")});
    });
})(jQuery)