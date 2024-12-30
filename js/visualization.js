// Wait for the window to fully load (including images and Three.js assets)
window.onload = function () {
    const preloader = document.querySelector('.preloader');

    // Hide the preloader once everything is loaded
    if (preloader) {
        preloader.style.display = 'none';
    }

    // Start your Three.js scene rendering after the page has fully loaded
    startThreeJSScene();
};

// Function to initialize and start the Three.js scene
function startThreeJSScene() {
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
        sprite.userData = brand; // Store brand info in the sprite's userData
        brandGroup.add(sprite);
        nodes.push(sprite);
    });

    // Select brand info elements
    const brandLogo = document.querySelector(".brand-logo");
    const brandName = document.querySelector(".brand-name");
    const brandDescription = document.querySelector(".brand-description");
    const visitButton = document.querySelector(".visit-button");

    // Function to update the brand info
    function updateBrandInfo(brand) {
        brandLogo.src = "/api/placeholder/80/80"; // Use a placeholder or actual brand logo
        brandName.textContent = brand.name;
        brandDescription.textContent = brand.description;
        visitButton.href = brand.url;
    }

    // Raycasting to detect sprite interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update the raycaster based on mouse position
        raycaster.update();

        // Detect intersections between the mouse and brand nodes (sprites)
        raycaster.update(camera, renderer.domElement);
        const intersects = raycaster.intersectObjects(brandGroup.children);

        if (intersects.length > 0) {
            // If the mouse intersects with a brand node, update the brand info
            const selectedBrand = intersects[0].object.userData;
            updateBrandInfo(selectedBrand);
        }

        renderer.render(scene, camera);
    }

    animate();
}
