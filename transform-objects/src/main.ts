import * as THREE from 'three';

const sizes = {
    width: 800,
    height: 600
};

const axesHelper = new THREE.AxesHelper();

// NO GROUP PART
const scene = new THREE.Scene();

scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const cube = new THREE.Mesh(geometry, material);

// cube.position.x = 0.7;
// cube.position.z = 1;
// cube.position.y = -0.5;

// OR

cube.position.set(0.7, -0.6, 1);

cube.scale.set(2, 0.5, 0.5);

// Rotation are applied in this order : X, Y, Z
// We can reorder the order by using the set method or the reorder method
cube.rotation.reorder("YXZ");

cube.rotation.y = Math.PI / 4;
cube.rotation.x = Math.PI / 4;

scene.add(cube);

// Distance between the cube and the center of the scene
console.log("length",cube.position.length());

// Take the vector length and reduce it to 1
cube.position.normalize();

console.log("length post normalize",cube.position.length());

// fov is in degrees and is the vertical field of view
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height
)

// We move the camera backward to see the cube
camera.position.z = 3;
// camera.position.y = 0.5;
// camera.position.x = 1;

camera.lookAt(cube.position)

scene.add(camera);

// Distance between the camera and the cube
console.log("distance to camera", cube.position.distanceTo(camera.position))

const canvas = document.querySelector('#canvas');

// Renderer will render the scene BUT from the camera point of view
const renderer = new THREE.WebGLRenderer({
    canvas: canvas!
})

// Resize the canvas
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)

// GROUP PART
const scene2 = new THREE.Scene();

scene2.add(axesHelper);

// fov is in degrees and is the vertical field of view
const camera2 = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height
)


const group = new THREE.Group();

scene2.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    })
)

group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
    })
)

cube2.position.x = -2;

group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff,
    })
)

cube3.position.x = 2;

group.add(cube3);

camera2.position.z = 3;

camera2.lookAt(cube1.position);

group.position.y = 1;
group.scale.x = -0.5
group.rotation.y = Math.PI / 4;

const canvas2 = document.querySelector('#canvas2');

const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2!
})

renderer2.setSize(sizes.width, sizes.height);

renderer2.render(scene2, camera2)