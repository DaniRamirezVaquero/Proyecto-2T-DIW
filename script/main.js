import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Creamos la escena y el contenedor
const scene = new THREE.Scene();
const container = document.getElementById('contenedor3D');

// Creamos la cámara
const camera = new THREE.PerspectiveCamera(30, container.offsetWidth / container.offsetHeight, 0.1, 1000);
camera.position.z = 6;
camera.position.y = 0.0;

// Creamos las luces ambiental y direccional
const light = new THREE.AmbientLight(0xffffff, 1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 0, 1);
scene.add(light2);
scene.add(light);

// Creamos el cargador de modelos
const loader = new GLTFLoader();

// Creamos el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Establece el color de fondo a blanco
renderer.setClearColor(0x000000, 0);

// Creamos una instancia de OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Declaramos la variable que contendrá el modelo
let object;

// Cargamos el modelo
loader.load('../public/scene.gltf', function (gltf) {
    object = gltf.scene;
    scene.add(object);
    animate();

}, undefined, function (error) {
    console.error(error);
});

// Creamos la función de animación
function animate() {
    requestAnimationFrame(animate);

    if (object) {
        object.rotation.y += 0.01;
    }
    controls.update();
    renderer.render(scene, camera);
}

// Evento para redimensionar la ventana
window.addEventListener('resize', function () {
    // Actualizamos el tamaño del renderizador
    renderer.setSize(container.offsetWidth, container.offsetHeight);

    // Actualizamos la relación de aspecto de la cámara
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
});


