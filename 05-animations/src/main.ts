import * as THREE from 'three';
import { gsap } from 'gsap/all';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
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

// Creating a tween (transition) with gsap
gsap.to(cube.position, {
    x: 2,
    duration: 1,
    delay: 1,
})
gsap.to(cube.position, {
    x: 0,
    duration: 1,
    delay: 2,
})


const clock = new THREE.Clock();


// We render the scene for each frame
// To ensure to have the same "visual animation" regardless of the framerate
// We use time as a coefficient to equilibrate the speed of an animation
let time = Date.now();
function frameLoop() {
    // MANUAL WAY
    const currentTime = Date.now();

    const delta = currentTime - time;

    time = currentTime;

    // Multiplying by delta time will give same visual results regardless of the framerate
    // cube.position.x += 0.0001 * delta;
    // cube.position.y += 0.0001 * delta;
    //
    // cube.rotation.y += 0.001 * delta;


    // THREE.JS CLOCK WAY
    const elapsedTime = clock.getElapsedTime();

    // 1 revolution per second because you need to have
    // a new second to get a multiple of 2PI
    // (2s = 2*2PI)
    // cube.rotation.y = elapsedTime * Math.PI * 2;

    // cube.position.y = Math.cos(elapsedTime);
    // cube.position.x = Math.sin(elapsedTime);

    // camera.position.y = Math.cos(elapsedTime);
    // camera.position.x = Math.sin(elapsedTime);
    // camera.lookAt(cube.position);

    renderer.render(scene, camera)

    window.requestAnimationFrame(frameLoop);
}

frameLoop()

