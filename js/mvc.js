(function($,undefined){
    var converter = new Markdown.Converter();

    var DocumentModel = Backbone.Model.extend({
	defaults: { markdown: "Select a **document** from the tree." },
    });

    var DocumentView = Backbone.View.extend({
	initialize: function(){
	    _.bindAll(this, 'render');
	    
	    this.render();
	},
	
	render: function(){
	    $(this.el).html(converter.makeHtml(this.model.get("markdown")));
	}
    });
    
    $(function(){
	var documentModel = new DocumentModel();
	new DocumentView({el: $("#mvc-port"), model: documentModel});
    });
})(jQuery);