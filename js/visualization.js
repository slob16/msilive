const container = document.getElementById('visualization-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Sample brands
const brands = Array.from({ length: 10 }, (_, i) => ({
    name: `Brand ${i + 1}`,
    description: `Description for Brand ${i + 1}`,
    url: `https://brand${i + 1}.com`,
    color: new THREE.Color(Math.random(), Math.random(), Math.random())
}));

// Create brand nodes
const nodes = [];
const brandGroup = new THREE.Group();
scene.add(brandGroup);
brands.forEach((brand, i) => {
    const material = new THREE.SpriteMaterial({ color: brand.color });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
    sprite.userData = brand;
    brandGroup.add(sprite);
    nodes.push(sprite);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

