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
	model: DocumentLeaf,
	
	// The url which holds the document leaf data
	url : "documents/toc.json",
	
	// The sync method is called when a client calls fetch.
	sync : function(method, model) {
	    // We only use it to retrieve data from the server at the moment.
	    if (method == 'read') {
		// Make an asynchronous ajax call to fetch the json document at `url`.
		$.ajax({
		    url: model.url,
		    dataType: "json",
		    // We are expecting a json object with a `documents` property.
		    // The documents property should hold a literal object which can be used
		    // to instantiate a `DocumentLeaf` model.
		    success: function(data){
			// Add each document to the model.
			_.each(data.documents, function(document){
			    model.add(document);
			});
		    },
		    async: false
		});
	    }
	}
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
	documentLeafs.fetch();

	documentTreeView = new DocumentTreeView({el: $("#dynamic-selection"), model: documentLeafs});

	// The tree is a *implicit* controller. Foreach document in the
	// tree...
	$("#dynamic-selection li").each(function(){
	    var element = $(this);
	    // ... bind the click event to `loadDocument` method of
	    // `documentModel`.
	    element.click(function(){
		documentModel.loadDocument(element.attr('href'));
	    });
	});
    });
})(jQuery)