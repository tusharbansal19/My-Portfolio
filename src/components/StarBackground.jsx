import React, { useEffect, useRef, useCallback } from 'react';

const STAR_COUNT = 50; // Reduced from 100
const LINE_DISTANCE = 100; // Reduced from 120
const FPS = 30; // Limit to 30 FPS instead of 60

const getRandom = (min, max) => Math.random() * (max - min) + min;

const StarBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  const draw = useCallback((ctx, stars, width, height, currentTime) => {
    // Limit FPS
    if (currentTime - lastTimeRef.current < 1000 / FPS) {
      return;
    }
    lastTimeRef.current = currentTime;

    ctx.clearRect(0, 0, width, height);
    
    // Solid dark purple background
    ctx.fillStyle = '#18122b';
    ctx.fillRect(0, 0, width, height);
    
    // Draw lines between close stars (optimized)
    ctx.save();
    ctx.strokeStyle = 'rgba(162,89,255,0.7)';
    ctx.shadowColor = '#a259ff';
    ctx.shadowBlur = 8;
    
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < LINE_DISTANCE) {
          ctx.globalAlpha = 0.15 + 0.3 * (1 - dist / LINE_DISTANCE);
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
    
    // Draw stars
    ctx.save();
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#a259ff';
      ctx.shadowBlur = 8; // Reduced from 12
      ctx.globalAlpha = 0.6; // Reduced from 0.8
      ctx.fill();
    });
    ctx.restore();
    
    // Animate stars
    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;
      
      // Bounce off edges
      if (star.x < 0 || star.x > width) star.vx *= -1;
      if (star.y < 0 || star.y > height) star.vy *= -1;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Create stars with random positions and velocities
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: getRandom(0, width),
      y: getRandom(0, height),
      r: getRandom(0.8, 1.5), // Reduced size
      vx: getRandom(-0.1, 0.1), // Reduced velocity
      vy: getRandom(-0.1, 0.1),
    }));

    const animate = (currentTime) => {
      draw(ctx, stars, width, height, currentTime);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Optimized resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [draw]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
};

export default StarBackground; 