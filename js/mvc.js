(function($,undefined){
    var converter = new Markdown.Converter();

    var DocumentView = Backbone.View.extend({
	initialize: function(){
	    _.bindAll(this, 'render');
	    
	    this.render();
	},
	
	render: function(){
	    $(this.el).html(converter.makeHtml("Select a **document** from the tree."));
	}
    });
    
    $(function(){
	new DocumentView({el: $("#mvc-port")});
    });
})(jQuery);