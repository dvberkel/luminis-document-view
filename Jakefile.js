var fs = require("fs");

desc("Create table of contents for documents directory");
task("toc", [], function(){
    var tocEncodingFor = function(file) {
	return JSON.stringify({documentUrl: "documents/" + file, name: file});
    }

    var files = fs.readdirSync("documents");
    stream = fs.createWriteStream("documents/toc.json");
    stream.once("open", function(){
	stream.write('{"documents":[');
	for (var index = 0; index < files.length; index++) {
	    var file = files[index];
	    stream.write(tocEncodingFor(file));
	    if (index < files.length - 1) {
		stream.write(',');
	    }
	}
	stream.write(']}');
	stream.end();
    });
});

desc("default task");
task("default", ["toc"], function(){
    console.log("default task ran");
});