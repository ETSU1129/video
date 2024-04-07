import * as THREE from 'three'
import { MeshStandardMaterial } from 'three';
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {Reflector,Environment,MeshReflectorMaterial, Text, useTexture, useGLTF ,Plane, OrbitControls,Html} from '@react-three/drei'

export default function App() {
  return (
    <Canvas 
    gl={{ alpha: false,
            pixelRatio:[1, 1.5]
    }}
    camera={{ 
        position: [0, 1, 6], 

        fov: 50,
        near: 0.1,
        far: 2000

    }}>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['white', 0.1, 70]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <Carla rotation={[0, Math.PI - 0.4, 0]} position={[-1.2, 0, 0.6]} scale={[0.26, 0.26, 0.26]} />
          {/* <VideoText position={[0, 1.3, -2]} /> */}
          <Ground />
        </group>
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
 
        {/* <Intro /> */}
      </Suspense>

      <Html portal={document.body}>
        <div>
          <h1>Hello</h1>
        </div>
      </Html>
      <Environment
       preset="city"
       intensity={0.1}
      />
      <OrbitControls  />
    </Canvas>
    
  )
}

function Carla(props) {
  const { nodes } = useGLTF('./model/team7.glb')
  const videoTexture = useVideoTexture('./model/drei.mp4')
  const [floor, normal] = useTexture(['./model/normal_floor (1).jpeg', './model/roughness_floor (1).jpeg'])
  return <group {...props} dispose={null}>
    {/* <mesh castShadow receiveShadow geometry={nodes.ground.geometry} >
    <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={0}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
    </mesh>            */}
    <mesh castShadow receiveShadow geometry={nodes.roof.geometry}  >
        < MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048/4}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={1}
        />
    </mesh>
    <mesh castShadow receiveShadow geometry={nodes.wall.geometry} >
        <meshBasicMaterial map={videoTexture}/>
    </mesh>
    <mesh castShadow receiveShadow geometry={nodes.peple.geometry}  >
    < MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048/4}
          mixBlur={1}
          mixStrength={80}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={1}
        />
    </mesh>
  </group>
}

function useVideoTexture(videoSrc) {
    const [videoTexture, setVideoTexture] = useState(null);
  
    useEffect(() => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.loop = true;
      video.muted = true;
      video.play();
  
      const texture = new THREE.VideoTexture(video);
      setVideoTexture(texture);
    }, [videoSrc]);
  
    return videoTexture;
  }


function Ground() {
    const [floor, normal] = useTexture(['./model/SurfaceImperfections003_1K-PNG_Color.png', './model/SurfaceImperfections003_1K-PNG_NormalGL.png'])
  
    return (
        <>
        <mesh>
          <Plane  position={[1,0,-1]}args={[25, 25]}  rotation={[-Math.PI / 2, 0, Math.PI / 1]}>
          <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048/4}
          mixBlur={0}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}

        />
          </Plane>
        </mesh>
        </>
      )
  }

function Intro() {
  const [vec] = useState(() => new THREE.Vector3())
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}
