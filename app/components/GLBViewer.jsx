import {useRef, useEffect, useState} from 'react';
import {PerspectiveCamera, OrbitControls, Environment} from '@react-three/drei';
import {Gltf} from '@react-three/drei';
import {useGLTF} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useFrame } from '@react-three/fiber';
import Sound from  '~/components/Sound';
import car from '../../public/car.glb';
import * as THREE from 'three';
export default function GLBViewer(sanity) {
  const modelRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const listItemRefs = useRef([]);
  const [targetRotation, setTargetRotation] = useState(0);
  const lerpAmount = 0.05;
  
  // Set up an event listener to get window dimensions
  useEffect(() => {
    // Initialize dimensions inside useEffect to avoid server-side window issues
    setDimensions({width: window.innerWidth, height: window.innerHeight});

    function handleResize() {
      setDimensions({width: window.innerWidth, height: window.innerHeight});
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Calculate camera's FOV
  const aspect = dimensions.width / dimensions.height;
  const fov = aspect > 1 ? 60 / aspect : 60;
  function debounce(func, delay) {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  }

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0); // Setting the target to the car's position
    }
  }, [fov]);
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0); // Setting the target to the car's position
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = document.querySelector('.container');

    // Pin the container
    ScrollTrigger.create({
      trigger: container,

      pin: true,
      start: 'top top',
      end: () => `${container.scrollHeight + window.innerHeight * 2}px`,
      pinSpacing: true,
      onUpdate: (self) => {
        // Map the scroll progress (0 to 1) to a rotation angle (e.g., 0 to 2 * Math.PI for full rotation)
        const angle = self.progress * 3 * Math.PI;
        setTargetRotation(angle);
      }
    });
    

    // Percentage for each item reveal

    const percentagePerItem = 100 / sanity.sanity.items.length;

    gsap.to(listItemRefs.current, {
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `${container.scrollHeight + window.innerHeight * 2}px`,
            onUpdate: (self) => {
                const progress = self.progress * 100;

                listItemRefs.current.forEach((item, index) => {
                    const startRange = index * percentagePerItem;
                    const endRange = (index + 1) * percentagePerItem;

                    if (
                        progress > startRange &&
                        progress < endRange &&
                        gsap.getProperty(item, 'opacity') !== 1
                    ) {
                        gsap.to(item, {
                            opacity: 1,
                            duration: 0.5,
                            visibility: 'visible',
                            overwrite: 'auto',
                        });
                    }
                    // No else block needed, as items should remain visible after they're revealed
                });
            },
        },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(document.querySelectorAll('li'));
    };
  }, []);

  function AnimatedModel({ targetRotation }) {
    const modelRef = useRef();
    const lerpAmount = 0.5;
  
    useFrame(() => {
      if (modelRef.current) {
        modelRef.current.rotation.y += (targetRotation - modelRef.current.rotation.y) * lerpAmount;
      }
    });
  
    return (
      <Gltf
        ref={modelRef}
        position={[0, -0.5, 0]}
        src="/fiat.glb"
        rotation={[0, 20, 0]}
        castShadow
        onLoad={(gltf) => {}}
      />
    );
  }
  
  return (
    <div className="relative container w-full  h-screen flex-row-reverse flex justify-center items-center">
      <div className="w-1/2 flex justify-center items-start flex-col pl-60 relative -top-40 ">
        <h2 className="title3D"> {sanity.sanity.ThreeDTitle}</h2>
        <div className="flex justify-start w-full">
          <ul className="pt-4">
            {sanity.sanity.items.map((item, index) => (
              <li
                className="opacity-0 invisible"
                key={index}
                ref={(el) => (listItemRefs.current[index] = el)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-1/2 h-full relative -top-40">
        <div className="container3D h-full">
          <Canvas
            shadows
            style={{width: '100%', height: '100%'}}
            camera={{
              position: [dimensions.width > 768 ? -3 : -1, 2, -8.5],
              fov: fov,
              aspect: aspect,
           
              ref: cameraRef,
            }}
          >
            {' '}
            <color attach="background" args={['#1a1a19']} />
            {/* Lights */}
            <ambientLight intensity={1} />
            <pointLight
              position={[5, 5, 5]}
              intensity={10.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            {/* Car Model */}
            <AnimatedModel targetRotation={targetRotation} />

            {/* Plane for shadow */}
            <mesh
              receiveShadow
              position={[0, 0, -0.2]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              {/* <circleGeometry attach="geometry" args={[3.5, 32]} />
          <meshStandardMaterial attach="material" color="#fff" /> */}
            </mesh>
            {/* Orbit Controls */}
            {/* <OrbitControls 
    ref={controlsRef}

/> */}
            {/* Environment */}
            <Environment files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/img/workshop_1k.hdr" />
          </Canvas>
        </div>
      </div>
      <Sound sanity={sanity} />
    </div>
  );
}
