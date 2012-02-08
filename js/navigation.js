(function($,undefined){
    var makeActive = function() {
	$("ul.nav li").removeClass("active");
	$(this).parent("li").addClass("active");
    }

    $(function(){
	$("ul.nav a, .brand").click(makeActive);
    });
})(jQuery)