import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';

function Carrot() {
  const ref = useRef<Group>(null);
  const gltf = useGLTF('https://voca-bucket.s3.ap-northeast-2.amazonaws.com/model/carrot.glb');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.6} />;
}
useGLTF.preload('https://voca-bucket.s3.ap-northeast-2.amazonaws.com/model/carrot.glb');

export default function MyCarrot() {
  return (
    <Canvas style={{ width: '100%', height: '200px' }} camera={{ position: [0, 1, 4], fov: 35 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 2, 2]} />
      <Carrot />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        target={[0.1, 0.4, 0]}
      />
    </Canvas>
  );
}
