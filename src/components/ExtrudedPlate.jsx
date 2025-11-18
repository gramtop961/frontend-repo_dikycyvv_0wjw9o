import React from 'react'

/*
  Extruded rounded-rectangle with front face gradient and visible metallic sides.
  Props:
  - width, height: front face size
  - depth: extrusion depth in px
  - radius: corner radius
  - faceGradient: CSS gradient string for the front face
  - sideColor: hex color for sides
  - opacity: for semi-transparent plates
  - rotate: deg rotation on Z for fanned stacks
  - translate: [x, y] offset in px
  - glow: { color: 'r,g,b', opacity, size, blur }
*/
const ExtrudedPlate = ({
  width = 200,
  height = 320,
  depth = 60,
  radius = 28,
  faceGradient = 'linear-gradient(180deg, #FFF2B2 0%, #FFC156 55%, #E08E2A 100%)',
  sideColor = '#8A8A8A',
  opacity = 1,
  rotate = 0,
  translate = [0, 0],
  shadow = '0 25px 80px rgba(0,0,0,0.25)'
}) => {
  const [tx, ty] = translate

  // We fake extrusion by stacking layered shadows and a side strip element
  return (
    <div
      className="absolute will-change-transform"
      style={{
        transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`,
        filter: 'saturate(1.05)'
      }}
    >
      {/* Side extrusion (right edge) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: width - 6,
          width: 6,
          height,
          background: sideColor,
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius,
          boxShadow: `inset -2px 0 4px rgba(0,0,0,0.25)`,
          filter: 'brightness(0.95)'
        }}
      />

      {/* Depth illusion via multiple offset blurred side layers */}
      {Array.from({ length: Math.max(8, Math.floor(depth / 6)) }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: i * (depth / 12),
            width,
            height,
            borderRadius: radius,
            background: sideColor,
            opacity: 0.12,
            filter: 'blur(0.2px)',
          }}
        />
      ))}

      {/* Front face */}
      <div
        style={{
          position: 'relative',
          width,
          height,
          borderRadius: radius,
          overflow: 'hidden',
          background: faceGradient,
          opacity,
          boxShadow: `${shadow}, inset 0 0 40px rgba(255, 220, 150, 0.35)`,
        }}
      >
        {/* subtle sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(120% 60% at 50% -10%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 60%), radial-gradient(50% 80% at 50% 120%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 50%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  )
}

export default ExtrudedPlate
