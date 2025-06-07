import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function Avocado() {
  const ref = useRef<Group>(null);
  const gltf = useGLTF('/model/avocado.glb');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.3} />;
}
useGLTF.preload('/model/avocado.glb');

export default function MyAvocado() {
  return (
    <Canvas style={{ width: '100%', height: '200px' }} camera={{ position: [0, 2, 4], fov: 35 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />
      <Avocado />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        target={[0.06, 0.5, 0]}
      />
    </Canvas>
  );
}
