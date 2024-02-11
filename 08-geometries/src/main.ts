import * as THREE from 'three';
import "./style.css";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// We add values for height, width and depth segments to have more details
// const geometry = new THREE.BoxGeometry(1,1,1, 2,2,2);

/* Creation of a custom geometry */

const geometry = new THREE.BufferGeometry();

/* One triangle */

// const positionArray = new Float32Array([
//     0, 0, 0, // First vertex
//     0, 1, 0, // Second vertex
//     1, 0, 0, // Third vertex
// ])

// 3 values per vertex
// const positionAttributes = new THREE.BufferAttribute(positionArray, 3);

// geometry.setAttribute("position", positionAttributes);


/* Several triangles */
const count = 500;

// 500 triangles / 3 vertices per triangles / 3 values per vertex
let positionsArray = new Float32Array(count * 3 *3)

for (let i = 0; i < count * 3 *3; i++) {
    // Math.random returns between 0 and 1. We want between -0.5 and 0.5 to center the shape
    positionsArray[i] = Math.random() - 0.5
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

geometry.setAttribute('position', positionsAttribute);


const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// fov is in degrees and is the vertical field of view
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
)

// We move the camera backward to see the cube
camera.position.z = 3;

scene.add(cube);
scene.add(camera);

const canvas = document.querySelector<HTMLElement>('#canvas')!;

// Camera controls
const controls = new OrbitControls(camera, canvas)

// With damping, movement is not brutally stopped when mouse stops to move
controls.enableDamping = true;

// Change the target of the control (require to call update() after)
// controls.target.y = 2;
// controls.update();

// Renderer will render the scene BUT from the camera point of view
const renderer = new THREE.WebGLRenderer({
    canvas
})

// Resize the canvas
renderer.setSize(sizes.width, sizes.height);

// Handle pixel ratio
// 2 is the higher pixel ratio we're going to handle, if we decide to handle higher than 2 we would have too many
// renders to do
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle responsive
window.addEventListener("resize", () => {

    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);

    // Setting pixel ratio here can help to handle pixel ratio in
    // case where user move the window to another screen with another pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// "Real" Fullscreen on double click
window.addEventListener("dblclick", () => {
    document.fullscreenElement
        ? document.exitFullscreen()
        : canvas.requestFullscreen();
})

function frameLoop() {
    // When damping enabled we have to update controls on each frame
    controls.update();

    renderer.render(scene, camera)

    window.requestAnimationFrame(frameLoop);
}

frameLoop()
