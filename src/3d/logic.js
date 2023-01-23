import * as THREE from '../../node_modules/three/build/three.module.js';
import {GLTFLoader} from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x00000)

const material = new THREE.MeshLambertMaterial()

const loader = new GLTFLoader()
loader.load("http://127.0.0.1:5500/src/static/trapstar4.glb", function(gltf){
    const root = gltf.scene;
    root.position.set(0, -13, 0)
    root.scale.set(10,10,10)
    scene.add(root)
}, function(xhr) {
console.log(xhr.loaded/xhr.total * 100)
})

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 4)
hemiLight.position.set(0, 10, 0)
scene.add(hemiLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.position.set(0, 10, 0)
scene.add(ambientLight)

/* const directLight = new THREE.DirectionalLight(0xffffff, 0.1)
directLight.position.set(0, 10, 5)
scene.add(directLight) */

const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000)
camera.position.set(0,0,8)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener("change", () => { renderer.render(scene, camera)});
controls.target.set(0,0,0);
controls.autoRotate = true
controls.autoRotateSpeed = 1

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.toneMapping = THREE.CineonToneMapping
renderer.render(scene, camera)

function animate(){
    controls.update();
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()
