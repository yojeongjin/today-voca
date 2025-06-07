import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function Radish() {
  const ref = useRef<Group>(null);
  const gltf = useGLTF('https://voca-bucket.s3.ap-northeast-2.amazonaws.com/model/radish.glb');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={gltf.scene} />;
}
useGLTF.preload('https://voca-bucket.s3.ap-northeast-2.amazonaws.com/model/radish.glb');

export default function MyRadish() {
  return (
    <Canvas style={{ width: '100%', height: '200px' }} camera={{ position: [0, 1, 4], fov: 35 }}>
      <ambientLight intensity={2} />
      <directionalLight position={[2, 2, 2]} />
      <Radish />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        target={[0.06, 0.2, 0]}
      />
    </Canvas>
  );
}
