<script>
const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: brand.color,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.copy(sprite.position);
            brandGroup.add(glow);
        });

        // Enhanced connections with brighter lines
        const connectionGroup = new THREE.Group();
        brandGroup.add(connectionGroup);

        function createConnections(activeNode) {
            connectionGroup.clear();
            nodes.forEach(node => {
                if (node !== activeNode) {
                    const distance = node.position.distanceTo(activeNode.position);
                    if (distance < 18) { // Increased connection distance
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            activeNode.position,
                            node.position
                        ]);
                        const material = new THREE.LineBasicMaterial({
                            color: activeNode.userData.color,
                            transparent: true,
                            opacity: 0.5, // Increased opacity
                            blending: THREE.AdditiveBlending,
                            linewidth: 2 // Thicker lines
                        });
                        const line = new THREE.Line(geometry, material);
                        connectionGroup.add(line);
                    }
                }
            });
        }

        // Updated camera position
        camera.position.z = 30;

        // Raycaster for interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let hoveredSprite = null;

        // Enhanced mouse move handler
        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(nodes);
            
            if (intersects.length > 0) {
                const sprite = intersects[0].object;
                if (hoveredSprite !== sprite) {
                    // Reset previous sprite
                    if (hoveredSprite) {
                        new TWEEN.Tween(hoveredSprite.scale)
                            .to({ x: 1.5, y: 1.5 }, 300)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .start();
                    }

                    // Animate new sprite
                    hoveredSprite = sprite;
                    new TWEEN.Tween(sprite.scale)
                        .to({ x: 2.5, y: 2.5 }, 300)
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start();

                    createConnections(sprite);

                    // Update info panel
                    const brandInfo = document.getElementById('brandInfo');
                    brandInfo.querySelector('.brand-name').textContent = sprite.userData.name;
                    brandInfo.querySelector('.brand-description').textContent = sprite.userData.description;
                    brandInfo.querySelector('.visit-button').href = sprite.userData.url;
                    brandInfo.style.opacity = '1';

                    // Animate brand info color
                    const color = sprite.userData.color;
                    brandInfo.style.borderColor = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.4)`;
                    brandInfo.style.boxShadow = `0 0 40px rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.3)`;
                }
            } else if (hoveredSprite) {
                // Reset sprite and hide info
                new TWEEN.Tween(hoveredSprite.scale)
                    .to({ x: 1.5, y: 1.5 }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();
                hoveredSprite = null;
                connectionGroup.clear();
                document.getElementById('brandInfo').style.opacity = '0';
            }
        }

        // Enhanced animation loop with brighter colors
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.001;

            // Smoother rotation
            brandGroup.rotation.y += 0.0005;
            brandGroup.rotation.x = Math.sin(time * 0.3) * 0.1;

            // Enhanced color animation
            nodes.forEach((node, i) => {
                const hue = (time + i / nodes.length) % 1;
                node.material.color.setHSL(hue, 1, 0.6);
            });

            TWEEN.update();
            renderer.render(scene, camera);
        }

        // Event listeners
        window.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    </script>
    
