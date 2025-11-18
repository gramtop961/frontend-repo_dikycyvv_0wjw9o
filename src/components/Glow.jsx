import React from 'react'

const Glow = ({ color = '255, 193, 86', size = 400, opacity = 0.6, blur = 80, className = '' }) => {
  const style = {
    width: size,
    height: size,
    filter: `blur(${blur}px)`,
    background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, rgba(${color}, 0) 60%)`,
  }
  return <div className={`pointer-events-none absolute ${className}`} style={style} />
}

export default Glow
