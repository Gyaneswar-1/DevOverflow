import React from 'react';

function Loader() {
  const loaderStyle: React.CSSProperties = {
    width: '120px',
    height: '20px',
    WebkitMask: 'linear-gradient(90deg, #000 70%, transparent 0) left / 20% 100%',
    background: 'linear-gradient(#000 0 0) left -25% top 0 / 20% 100% no-repeat #ddd',
    animation: 'l7 1s infinite steps(6)',
  };

  const keyframesStyle = `
    @keyframes l7 {
      100% {
        background-position: right -25% top 0;
      }
    }
  `;

  return (
    <div>
      <style>{keyframesStyle}</style>
      <div style={loaderStyle}></div>
    </div>
  );
}

export default Loader;