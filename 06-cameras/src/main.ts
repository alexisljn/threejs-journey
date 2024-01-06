import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
    sizes.width / sizes.height,
    0.1,
    100
)

// Orthographic camera
// const aspectRatio = sizes.width / sizes.height;

// We need to give the aspect ratio of the canvas for the
// horizontal amplitude of the camera (left and right)
// (here the camera is a 1 unit square so we directly use aspectRatio)
// const camera = new THREE.OrthographicCamera(
//     -aspectRatio,
//     aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// );

// We move the camera backward to see the cube
camera.position.z = 3;
// camera.position.y = 2;
// camera.position.x = 1.5;
console.log(camera.position.length())

scene.add(cube);
scene.add(camera);

const canvas = document.querySelector<HTMLElement>('#canvas');

// Camera controls
const controls = new OrbitControls(camera, canvas!)

// With damping, movement is not brutally stopped when mouse stops to move
controls.enableDamping = true;

// Change the target of the control (require to call update() after)
// controls.target.y = 2;
// controls.update();

// Renderer will render the scene BUT from the camera point of view
const renderer = new THREE.WebGLRenderer({
    canvas: canvas!
})

// Resize the canvas
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// Mouse movements Handling
let cursor = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", (event) => {
    // We divide by the sizes to get a value between 0 and 1
    // Then we substract 0.5 to get positive and negative values
    cursor = {
        x: event.clientX / sizes.width - 0.5,
        // event.clientY = 0 when on top but three.js considers Y = 0 at the bottom
        y: - (event.clientY / sizes.height - 0.5),
    }
})

function frameLoop() {

    // cube.rotation.y = clock.getElapsedTime();


    // camera.position.x = cursor.x * 10;
    // camera.position.y = cursor.y * 10;

    // Making manually full camera revolution around the cube
    // The coefficient multiplied to cursor.x defines the speed of the revolution
    // The coefficient multiplied to cos and sin add amplitude to camera position
    // Because cos and sin return values between -1 and 1
    // camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3;

    // Up and down movement
    // camera.position.y = cursor.y * 5;

    // camera.lookAt(cube.position);

    // When damping enabled we have to update controls on each frame
    controls.update();

    renderer.render(scene, camera)

    window.requestAnimationFrame(frameLoop);
}

frameLoop()
