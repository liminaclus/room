import * as THREE from 'three'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'

let verticalMirror;

// Canvas size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

// Add mirror
const geometry = new THREE.PlaneGeometry( 20, 20 );
verticalMirror = new Reflector( geometry, {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  color: 0xffffff //0xc1cbcb
});
verticalMirror.position.z = -5;
verticalMirror.position.x = -5;
verticalMirror.rotation.x += 3.14159/4;
verticalMirror.rotation.y += 3.14159/4;
scene.add( verticalMirror );

// Add green wall
const geometry1 = new THREE.BoxGeometry(4, 3, 0.1);
const material1 = new THREE.MeshLambertMaterial({color: 0x00ff00});
const wall1 = new THREE.Mesh(geometry1, material1);
wall1.castShadow = true
wall1.receiveShadow = true
scene.add(wall1);
wall1.position.z -= 2;

// Add blue wall
const geometry2 = new THREE.BoxGeometry(3, 3, 0.1);
const material2 = new THREE.MeshLambertMaterial({color: 0x0000ff});
const wall2 = new THREE.Mesh(geometry2, material2);
wall2.castShadow = true
wall2.receiveShadow = true
scene.add(wall2);
wall2.rotation.y += 3.14159/2;
wall2.position.x -= 1.5;
wall2.position.z -= 1.5;

// Add red wall
const geometry3 = new THREE.BoxGeometry(3, 3, 0.1);
const material3 = new THREE.MeshLambertMaterial({color: 0xff0000});
const wall3 = new THREE.Mesh(geometry3, material3);
wall3.castShadow = true
wall3.receiveShadow = true
scene.add(wall3);
wall3.rotation.y += 3.14159/2;
wall3.position.x += 1.5;
wall3.position.z -= 1.5;

// Add white cube
const geometry4 = new THREE.BoxGeometry(1, 1, 1);
const material4 = new THREE.MeshLambertMaterial({color: 0xffffff});
const cube1 = new THREE.Mesh(geometry4, material4);
cube1.castShadow = true
cube1.receiveShadow = true
scene.add(cube1);
cube1.position.z -= 0.5;

// Add purple sphere
const geometry5 = new THREE.SphereGeometry(0.2, 20, 20);
const material5 = new THREE.MeshLambertMaterial({color: 0xff00ff});
const sphere1 = new THREE.Mesh(geometry5, material5);
sphere1.castShadow = true
sphere1.receiveShadow = true
scene.add(sphere1);
sphere1.position.z -= 0.5;
sphere1.position.y += 0.9;

// Light
const light1 = new THREE.PointLight(0xffffff, 100, 100)
light1.position.set(1, 3, 1)
light1.castShadow = true
scene.add(light1)
const geometry6 = new THREE.SphereGeometry(0.1, 4, 4);
// const material6 = new THREE.MeshStandardMaterial({color: 0xffffff});
const material6 = new THREE.MeshBasicMaterial({color: 0xffffff}); // light doesn't matter for basic material
const sphere2 = new THREE.Mesh(geometry6, material6);
scene.add(sphere2);
sphere2.position.set(1, 3, 1)

//Set up shadow properties for the light
light1.shadow.mapSize.width = 512; // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5; // default
light1.shadow.camera.far = 500; // default

// Camera
const camera = new THREE.PerspectiveCamera( 75, sizes.width/sizes.height, 0.1, 1000 );
camera.position.z = 5;

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0x304050, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = true
controls.enablePan = false
controls.autoRotate = false

function sphere1oscillate() {
  if (sphere1.position.y<=2){
    sphere1.position.y+=0.01;
  }
  else{
    sphere1.position.y-=1.2;
  }
}

function animate() {
	requestAnimationFrame(animate);
  cube1.rotation.y += 3.14159/64;
  sphere1oscillate();
  renderer.render(scene, camera);
}
animate();