import { useEffect, useRef } from "react";

export function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Animated geometry system
    let time = 0;
    const lines = [];

    class GeometricLine {
      constructor() {
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        this.x2 = Math.random() * canvas.width;
        this.y2 = Math.random() * canvas.height;
        this.vx1 = (Math.random() - 0.5) * 0.5;
        this.vy1 = (Math.random() - 0.5) * 0.5;
        this.vx2 = (Math.random() - 0.5) * 0.5;
        this.vy2 = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 0.5 + 0.3;
        this.maxLife = this.life;
        this.hue = Math.random() * 60 + 200; // Blue-purple range
      }

      update() {
        this.x1 += this.vx1;
        this.y1 += this.vy1;
        this.x2 += this.vx2;
        this.y2 += this.vy2;

        // Wrap around screen
        if (this.x1 > canvas.width) this.x1 = 0;
        if (this.x1 < 0) this.x1 = canvas.width;
        if (this.y1 > canvas.height) this.y1 = 0;
        if (this.y1 < 0) this.y1 = canvas.height;

        if (this.x2 > canvas.width) this.x2 = 0;
        if (this.x2 < 0) this.x2 = canvas.width;
        if (this.y2 > canvas.height) this.y2 = 0;
        if (this.y2 < 0) this.y2 = canvas.height;

        this.life -= 0.005;
      }

      draw(ctx) {
        const opacity = this.life / this.maxLife;
        ctx.strokeStyle = `hsla(${this.hue}, 80%, 50%, ${opacity * 0.6})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
      }

      isAlive() {
        return this.life > 0;
      }
    }

    // Initialize lines
    for (let i = 0; i < 60; i++) {
      lines.push(new GeometricLine());
    }

    // Animation loop
    const animate = () => {
      time++;
      
      // Clear with fade trail
      ctx.fillStyle = "rgba(10, 10, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn new lines
      if (Math.random() < 0.4) {
        lines.push(new GeometricLine());
      }

      // Update and draw lines
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        line.update();
        
        if (line.isAlive()) {
          line.draw(ctx);
        } else {
          lines.splice(i, 1);
        }
      }

      // Draw central grid effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gridSize = 100;
      const gridOpacity = 0.05;

      ctx.strokeStyle = `rgba(99, 102, 241, ${gridOpacity})`;
      ctx.lineWidth = 1;

      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          const x = centerX + i * gridSize + Math.sin(time * 0.01 + i) * 20;
          const y = centerY + j * gridSize + Math.cos(time * 0.01 + j) * 20;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw connecting lines in grid
      for (let i = -2; i < 2; i++) {
        for (let j = -2; j < 2; j++) {
          const x1 = centerX + i * gridSize + Math.sin(time * 0.01 + i) * 20;
          const y1 = centerY + j * gridSize + Math.cos(time * 0.01 + j) * 20;
          const x2 = centerX + (i + 1) * gridSize + Math.sin(time * 0.01 + i + 1) * 20;
          const y2 = centerY + j * gridSize + Math.cos(time * 0.01 + j) * 20;

          ctx.strokeStyle = `rgba(99, 102, 241, ${gridOpacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
