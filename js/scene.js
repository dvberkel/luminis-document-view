// This example is taken from [GitHub](https://github.com/mrdoob/three.js "GitHub page for Three.js")
//
// Annotations are mine and cross reference documentation.
//
// An self executing function to limit the scope of variables and have
// prestine values for `$` and `undefined`.
(function($,undefined){
    // Introduce variables which determine the width and height of the canvas.
    var width = 400, height = 300;

    // These variables play a role in the Three.js example
    var camera, scene, renderer, geometry, material, mesh;
    
    // Define a function which assigns the declared variables with meaningful Three.js objects.
    function init() {
	// A scene is where 3d objects take their positions.
        scene = new THREE.Scene();
	
	// [PerspectiveCamera](http://mrdoob.github.com/three.js/docs/48/api/cameras/PerspectiveCamera.html#PerspectiveCamera)
	// is an example of a camera which controls how a scene will be viewed. There are a few different
	// [camera's](http://mrdoob.github.com/three.js/docs/48/api/cameras/index.html).
        camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
	// The camera's default position is at `(0,0,0)` which is not very usefull. Pull it back (towards the viewer).
        camera.position.z = 1000;
	// Add it to the scene.
        scene.add( camera );
	
	// There are various predefined geometries which can be used for creating a scene.
        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
	
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( width, height );
	
	$("#scene-port").append(renderer.domElement);
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        render();

    }
    
    function render() {

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );

    }

    $(function(){
	init();
	animate();
    });
    
})(jQuery)