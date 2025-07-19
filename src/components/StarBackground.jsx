import React, { useEffect, useRef } from 'react';

const getRandom = (min, max) => Math.random() * (max - min) + min;

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    canvas.width = width;
    canvas.height = height;

    // Responsive values based on viewport
    const isMobile = width < 768;
    let STAR_COUNT = isMobile ? 30 : 100;
    let LINE_DISTANCE = isMobile ? 100 : 120;

    // Create stars with random positions and velocities
    let stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: getRandom(0, width),
      y: getRandom(0, height),
      r: getRandom(1, 2.2),
      vx: getRandom(-0.15, 0.15),
      vy: getRandom(-0.15, 0.15),
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Solid dark purple background
      ctx.fillStyle = '#18122b';
      ctx.fillRect(0, 0, width, height);
      // Draw lines between close stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DISTANCE) {
            ctx.save();
            ctx.globalAlpha = 0.15 + 0.5 * (1 - dist / LINE_DISTANCE);
            ctx.strokeStyle = 'rgba(162,89,255,0.7)'; // glowing purple
            ctx.shadowColor = '#a259ff';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      // Draw stars
      stars.forEach(star => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#a259ff';
        ctx.shadowBlur = 12;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.restore();
      });
      // Animate
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        // Bounce off edges
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
      });
      animationId = requestAnimationFrame(draw);
    }
    draw();
    // Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Update responsive values
      const newIsMobile = width < 768;
      const newStarCount = newIsMobile ? 20 : 100;
      const newLineDistance = newIsMobile ? 80 : 120;
      
      // Recreate stars if count changed
      if (newStarCount !== STAR_COUNT) {
        STAR_COUNT = newStarCount;
        LINE_DISTANCE = newLineDistance;
        stars = Array.from({ length: STAR_COUNT }).map(() => ({
          x: getRandom(0, width),
          y: getRandom(0, height),
          r: getRandom(1, 2.2),
          vx: getRandom(-0.15, 0.15),
          vy: getRandom(-0.15, 0.15),
        }));
      } else {
        LINE_DISTANCE = newLineDistance;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:-1,pointerEvents:'none'}} />
  );
};

export default StarBackground; 