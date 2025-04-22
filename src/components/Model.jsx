/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useMemo, useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function FlowingParticles({ count = 1500 }) {
  const particles = useRef()
  const { mouse } = useThree()
  
  // Particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    
    const colorPalette = [
      new THREE.Color('#2ecc71'),   // Emerald
      new THREE.Color('#1abc9c'),   // Teal
      new THREE.Color('#27ae60')    // Green
    ]

    for (let i = 0; i < count * 3; i += 3) {
      // Spread particles in a smaller tube-like shape
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 1.5
      
      pos[i] = Math.cos(angle) * radius
      pos[i + 1] = (Math.random() - 0.5) * 6
      pos[i + 2] = Math.sin(angle) * radius
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      color.toArray(col, i)
    }
    
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (!particles.current) return
    
    const positions = particles.current.geometry.attributes.position.array
    
    // Animate particles in a flowing motion
    for (let i = 0; i < count * 3; i += 3) {
      positions[i + 1] -= 0.015  // Slower vertical movement
      
      // Subtle wave motion
      positions[i] += Math.sin(clock.elapsedTime + positions[i + 1] * 0.2) * 0.015
      positions[i + 2] += Math.cos(clock.elapsedTime + positions[i + 1] * 0.2) * 0.015
      
      // Mouse interaction
      const dx = positions[i] - mouse.x * 3
      const dz = positions[i + 2] - mouse.y * 3
      const distance = Math.sqrt(dx * dx + dz * dz)
      const force = Math.max(0, 1 - distance / 2.5)
      
      positions[i] += dx * 0.004 * force
      positions[i + 2] += dz * 0.004 * force
      
      // Reset position
      if (positions[i + 1] < -3) {
        positions[i + 1] = 3
        positions[i] = (Math.random() - 0.5) * 2
        positions[i + 2] = (Math.random() - 0.5) * 2
      }
    }
    
    particles.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particles} rotation={[0, 0, Math.PI / 4]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}  // Smaller particles
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Model component
const Model = () => {
  const [windowSize, setWindowSize] = useState({
    width: 700,
    height: 700
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  // eslint-disable-next-line no-unused-vars
  const aspectRatio = 1; // Square aspect ratio

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative w-full h-0 pb-[100%]"> {/* Maintain 1:1 aspect ratio */}
        <div className="absolute inset-0">
          <Canvas 
            camera={{ 
              position: [0, 0, isMobile ? 12 : 10],
              fov: isMobile ? 55 : 50,
              near: 0.1,
              far: isMobile ? 25 : 20
            }}
            gl={{ antialias: false }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.4} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1.2} 
              color="#27ae60"
            />
            <Suspense fallback={null}>
              <FlowingParticles count={isMobile ? 1000 : 1500} />
              <EffectComposer>
                <Bloom
                  blendFunction={BlendFunction.ADD}
                  intensity={isMobile ? 1 : 1.2}
                  kernelSize={2}
                  luminanceThreshold={0.15}
                  luminanceSmoothing={0.4}
                />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Model