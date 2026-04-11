import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = Math.min(window.innerWidth / 5, 200); // Dense but performant
    const mouse = { x: width / 2, y: height / 2, radius: 200 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2; // 3D depth illusion
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.size = Math.random() * 2 + 0.5;
        this.originalSize = this.size;
      }

      draw() {
        // Depth-based opacity and sizing
        const depthOpacity = this.z / 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (depthOpacity * 0.4)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Slowly drift to give it life
        this.baseX += (Math.random() - 0.5) * 0.5;
        this.baseY += (Math.random() - 0.5) * 0.5;

        // Wrap around screen
        if (this.baseX > width) this.baseX = 0;
        if (this.baseX < 0) this.baseX = width;
        if (this.baseY > height) this.baseY = 0;
        if (this.baseY < 0) this.baseY = height;

        // 3D Parallax Interaction with Mouse
        let dx = mouse.x - this.baseX;
        let dy = mouse.y - this.baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let forceDirX = dx / distance;
          let forceDirY = dy / distance;
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = forceDirX * force * this.density * this.z;
          let directionY = forceDirY * force * this.density * this.z;
          
          this.x = this.baseX - directionX;
          this.y = this.baseY - directionY;
          this.size = this.originalSize + (force * 2.5);
        } else {
          this.x = this.baseX;
          this.y = this.baseY;
          this.size = this.originalSize;
        }
      }
    }

    // Initialize Neural Mesh
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawLines = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // Draw geometric lines for particles close to each other
          if (distance < 120) {
             let opacity = 1 - (distance / 120);
             // Depth-based line thickness
             let depthAverage = (particles[a].z + particles[b].z) / 2;
             ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15 * depthAverage})`;
             ctx.lineWidth = 0.5 * depthAverage;
             ctx.beginPath();
             ctx.moveTo(particles[a].x, particles[a].y);
             ctx.lineTo(particles[b].x, particles[b].y);
             ctx.stroke();
          }
        }
      }
    }

    const animate = () => {
      // Extremely performant clearing map
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
      
      // Draw massive background gradient orb to simulate 3D space lighting
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      gradient.addColorStop(0, 'rgba(30, 30, 35, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawLines();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
        mouse.x = width / 2;
        mouse.y = height / 2;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-[100vh] -z-20 overflow-hidden pointer-events-auto bg-[#050505]">
       <canvas ref={canvasRef} className="w-full h-full block" />
       {/* Edge blur vignette to give depth to the canvas */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10 pointer-events-none" />
    </div>
  );
}
