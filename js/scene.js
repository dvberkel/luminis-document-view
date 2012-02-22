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
	
	// There are various predefined 
	// [geometries](http://mrdoob.github.com/three.js/docs/48/api/core/Geometry.html "Documentation on Geometries")
	// which can be used for creating a scene.
        geometry = new THREE.CubeGeometry( 200, 200, 200 );
	
	// Materials determine how geometries are rendered. 
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	
	// Combine the material with the geometry...
        mesh = new THREE.Mesh( geometry, material );
	// ... and at the result to the scene
        scene.add( mesh );
	
	// Choose a renderer for the scene. There are various 
	// [renderers](http://mrdoob.github.com/three.js/ "Github page on Three.js") available
        renderer = new THREE.CanvasRenderer();
	
	// Set configure the renderer aperture.
        renderer.setSize( width, height );
	
	// Add the apropriate element to the page. 
	$("#scene-port").append(renderer.domElement);
    }
    
    // We define a function to animate the scene
    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
	transform();
        render();

    }
    
    // A function to transform the mesh generated in `init`
    function transform() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
    }
    
    // Render the scene with the defined camera.
    function render() {
        renderer.render( scene, camera );
    }

    // When the document is ready loading...
    $(function(){
	// ... initialize and...
	init();
	// ... animate the scene.
	animate();
    });
    
})(jQuery)