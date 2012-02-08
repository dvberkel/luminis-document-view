$(function(){
    var converter = new Markdown.Converter();
    
    $(".markdown").each(function(){
        var element = $(this);
        element.html(converter.makeHtml(element.text()));
    });
});
