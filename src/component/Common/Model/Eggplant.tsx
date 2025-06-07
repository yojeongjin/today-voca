import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function Eggplant() {
  const ref = useRef<Group>(null);
  const gltf = useGLTF('/model/eggplant.glb');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.3} />;
}
useGLTF.preload('/model/eggplant.glb');

export default function MyEggplant() {
  return (
    <Canvas style={{ width: '100%', height: '200px' }} camera={{ position: [0, 1, 4], fov: 35 }}>
      <ambientLight intensity={3} />
      <directionalLight position={[2, 2, 2]} />
      <Eggplant />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        target={[0.06, 0.4, 0]}
      />
    </Canvas>
  );
}
