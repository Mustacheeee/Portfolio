import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  // Path relative to the public directory
  const { scene } = useGLTF(
    "./desktop_pc/scene.gltf",
    undefined,
    (loader) => {
      const dracoLoader = new DRACOLoader();
      loader.setDRACOLoader(dracoLoader);
    }
  );

  useEffect(() => {
    if (scene) {
      console.log("Root scene object:", scene);
      scene.traverse((child) => {
        if (child.isMesh) {
          // console.log(`Mesh: ${child.name}`, child.geometry);
          const posAttr = child.geometry.attributes.position;
      
          if (!posAttr) {
            console.warn(`Mesh ${child.name} has no position attribute`, child);
          } else {
            const array = posAttr.array;
            if (array.some((v) => !Number.isFinite(v))) {
              console.error(`Mesh ${child.name} has invalid position data`, array);
            }
          }
        }
      });
      
    }
  }, [scene]);
  

  return (
    <mesh>
      {/* Main ambient light - fills the entire scene */}
      <ambientLight intensity={0.25} />
      
      {/* Directional light - like sunlight */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      {/* Hemisphere light - provides natural gradient lighting */}
      <hemisphereLight 
        intensity={0.5} 
        groundColor="#404040" 
        skyColor="#ffffff" 
      />
      
      {/* Spot light to highlight the computer */}
      <spotLight
        position={[-5, 10, 2]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      
      {/* Point lights to add detail */}
      <pointLight position={[0, -3, 0]} intensity={0.5} distance={7} />
      <pointLight position={[-5, 0, 0]} intensity={0.3} distance={7} />
      
      {/* The 3D model */}
      <primitive
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -1.2, -2.2] : [0, -1.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
        castShadow
        receiveShadow
      />
    </mesh>
  );
};

const MemoizedComputerModel = React.memo(Computers);

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MemoizedComputerModel isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;