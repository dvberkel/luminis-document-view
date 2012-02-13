// This file will load the document tree menu from the server.
// This is achieved by a preprocessing step in which the `documents` directory is
// read and reproduced in a json structure.

// We are using a self evaluating function for two reasons. To limit the scope of
// defined variable and be certain of the variables `$` and `undefined`.
(function($,undefined){
    // A `DocumentLeaf` is a model for a document on the server.
    var DocumentLeaf = Backbone.Model.extend({
	defaults: { documentUrl: "documents/missing.md", name: "enter a name"}
    });
    
    // A collection ...
    var DocumentLeafs = Backbone.Collection.extend({
	// ... of `DocumentLeaf`s
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
	    var element = $(this.el), template = this.template;
	    element.empty();
	    this.model.each(function(model){
		element.append(template(model.toJSON()));
	    });
	}
    });

    // After the document is loaded...
    $(function(){
	// ... create a document model and corresponding view.
	var documentModel = new DocumentModel();
	new DocumentView({el: $("#dynamic-port"), model: documentModel});
	
	// Create document leafs and a corresponding document tree view.
	documentLeafs = new DocumentLeafs();
	documentLeafs.add({documentUrl: 'documents/document1.md', name: 'document 1'});
	documentLeafs.add({documentUrl: 'documents/document2.md', name: 'document 2'});

	documentTreeView = new DocumentTreeView({el: $("#dynamic-selection"), model: documentLeafs});
    });
})(jQuery)