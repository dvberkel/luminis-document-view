// This example is taken from [GitHub](https://github.com/mrdoob/three.js "GitHub page for Three.js")
(function($,undefined){
    var width = 400, height = 300;

    var camera, scene, renderer,
    geometry, material, mesh;
    
    function init() {
        scene = new THREE.Scene();
	
        camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
        camera.position.z = 1000;
        scene.add( camera );
	
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