import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

const sizes = {
    width: 800,
    height: 600
};

// fov is in degrees and is the vertical field of view
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height
)

// We move the camera backward to see the cube
camera.position.z = 3;

scene.add(cube);
scene.add(camera);

const canvas = document.querySelector('#canvas');

// Renderer will render the scene BUT from the camera point of view
const renderer = new THREE.WebGLRenderer({
    canvas: canvas!
})

// Resize the canvas
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)