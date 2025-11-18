import React from 'react'
import SceneBackground from './components/SceneBackground'
import ExtrudedPlate from './components/ExtrudedPlate'
import Glow from './components/Glow'

function App() {
  // Base sizes
  const central = {
    width: 220,
    height: 352, // ~1:1.6 ratio
    depth: 60,
    radius: 40,
  }

  // Positions
  const centerX = 0
  const centerY = 0

  // Left stack configuration
  const leftPlates = [
    { rot: 25, offset: [-240, -20] },
    { rot: 30, offset: [-280, 20] },
    { rot: 35, offset: [-320, 60] },
    { rot: 38, offset: [-360, 95] },
  ]

  // Right neon plates configuration (semi-transparent)
  const rightPlates = [
    { rot: -20, offset: [250, -10], grad: 'linear-gradient(180deg, #FF9D59 0%, #FF6FA1 100%)', opacity: 0.7 },
    { rot: -26, offset: [290, 25], grad: 'linear-gradient(180deg, #FF5FC8 0%, #D742FF 100%)', opacity: 0.72 },
    { rot: -32, offset: [330, 60], grad: 'linear-gradient(180deg, #A86BFF 0%, #BB8DFF 100%)', opacity: 0.75 },
    { rot: -38, offset: [370, 95], grad: 'linear-gradient(180deg, #A9C9FF 0%, #D7EBFF 100%)', opacity: 0.78 },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SceneBackground />

      {/* Centering wrapper */}
      <div className="relative flex items-center justify-center min-h-screen">
        {/* Global ambient blooms */}
        <Glow color="255, 193, 86" size={700} opacity={0.35} blur={120} className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Glow color="162, 105, 255" size={700} opacity={0.2} blur={140} className="bottom-16 left-1/2 -translate-x-1/2" />

        {/* Scene container for stacking */}
        <div className="relative" style={{ width: 1100, height: 700 }}>
          {/* Left gray stack */}
          {leftPlates.map((p, idx) => (
            <ExtrudedPlate
              key={`L${idx}`}
              width={200}
              height={320}
              depth={56}
              radius={36}
              faceGradient={'linear-gradient(180deg, #8A8A8A 0%, #8A8A8A 100%)'}
              sideColor="#8A8A8A"
              rotate={p.rot}
              translate={[centerX + p.offset[0], centerY + p.offset[1]]}
              shadow={'0 20px 60px rgba(0,0,0,0.25)'}
            />
          ))}

          {/* Right neon stack */}
          {rightPlates.map((p, idx) => (
            <React.Fragment key={`R${idx}`}>
              <ExtrudedPlate
                width={200}
                height={320}
                depth={40}
                radius={36}
                faceGradient={p.grad}
                sideColor="rgba(255,255,255,0.35)"
                opacity={p.opacity}
                rotate={p.rot}
                translate={[centerX + p.offset[0], centerY + p.offset[1]]}
                shadow={'0 30px 80px rgba(0,0,0,0.20)'}
              />
              {/* Colored glow matching each neon plate */}
              <div className="absolute" style={{
                transform: `translate(${centerX + p.offset[0]}px, ${centerY + p.offset[1]}px) rotate(${p.rot}deg)`
              }}>
                <Glow color={idx===0? '255, 130, 140' : idx===1? '230, 100, 255' : idx===2? '168, 107, 255' : '169, 201, 255'} size={360} opacity={0.45} blur={90} />
              </div>
            </React.Fragment>
          ))}

          {/* Central thick, glowing object */}
          <ExtrudedPlate
            width={central.width}
            height={central.height}
            depth={central.depth}
            radius={central.radius}
            faceGradient={'linear-gradient(180deg, #FFF2B2 0%, #FFC156 55%, #E08E2A 100%)'}
            sideColor="#8A8A8A"
            rotate={0}
            translate={[centerX - central.width/2, centerY - central.height/2]}
            shadow={'0 40px 120px rgba(224, 142, 42, 0.35), 0 10px 40px rgba(0,0,0,0.25)'}
          />

          {/* Central warm bloom */}
          <Glow color="255, 216, 140" size={600} opacity={0.4} blur={120} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  )
}

export default App
