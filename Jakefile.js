var fs = require("fs");
var exec = require("child_process").exec;

desc("Create documentation from the javascript sources");
task("docco", [], function(){
    console.log("Creating documentation");
    exec("docco js/*", function(){complete();});
}, true);

desc("Create table of contents for documents directory");
task("toc", [], function(){
    console.log("Creating table of contents");
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
task("default", ["docco", "toc"], function(){
    console.log("default task ran");
});