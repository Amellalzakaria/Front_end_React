import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Logo() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a loader for GLTF models
    const loader = new GLTFLoader();

    // Load the GLB model
    loader.load(
      '{"ModelLoadTrigger":2,"ModelLoadSource":7,"ModelRemixAssetId":"","PaintSessionId":"","ModelId":"ZsHr9rjZ6l49v7oGzEPF0bVNfbf0GbcF1mUJM1LyGE2vFPMnm+oRds/TMEJtX8u5Tg4JJsOsWI2LFvx+J9Oz2A==","ModelName":"Flacon de pharmacie","ModelInstanceId":"111384cf-5cab-4f60-be72-0919f62d3ea7","IsModelPrintable":true,"IsModelPaintable":true,"IsMinecraftModel":false,"IsModelAnimated":false,"TriangleCount":392}', // Replace with the path to your GLB file
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Position, scale, or rotate the model if necessary
        model.rotation.x = Math.PI / 2; // Rotate the model by 90 degrees

        // Animation loop
        function animate() {
          requestAnimationFrame(animate);

          // Rotate the model
          model.rotation.y += 0.01;

          // Render the scene with the camera
          renderer.render(scene, camera);
        }

        // Start the animation loop
        animate();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // Clean up
    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="logo-container" ref={containerRef} />;
}

export default Logo;
