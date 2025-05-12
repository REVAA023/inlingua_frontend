import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: any[] = [];
  private animationFrame: number = 0;
  private mp = 150; // max particles
  private confettiActive = true;
  private animationComplete = false;
  private angle = 0;
  private tiltAngle = 0;
  private W = 0;
  private H = 0;

  private colors = [
    "DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue",
    "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"
  ];

  initCanvas() {
    if (document.getElementById('confettiCanvas')) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confettiCanvas';
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '9999'
    });
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.W;
      this.canvas.height = this.H;
    }
  }

  start() {
    this.initCanvas();
    this.particles = [];

    for (let i = 0; i < this.mp; i++) {
      this.particles.push(this.createParticle());
    }

    this.confettiActive = true;
    this.animationComplete = false;
    this.animate();
  }

  stop() {
    this.confettiActive = false;
    cancelAnimationFrame(this.animationFrame);
    if (this.ctx) this.ctx.clearRect(0, 0, this.W, this.H);
    if (this.canvas) this.canvas.remove();
    this.canvas = null;
  }

  private animate() {
    if (this.animationComplete) return;
    this.animationFrame = requestAnimationFrame(() => this.animate());
    this.draw();
  }

  private draw() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.W, this.H);
    this.angle += 0.01;
    this.tiltAngle += 0.1;

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(this.angle + p.d) + 3 + p.r / 2) / 2;
      p.x += Math.sin(this.angle);
      p.tilt = (Math.sin(p.tiltAngle - i / 3)) * 15;

      this.ctx.beginPath();
      this.ctx.lineWidth = p.r / 2;
      this.ctx.strokeStyle = p.color;
      this.ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      this.ctx.stroke();

      // remove if out of view
      if (p.y > this.H) {
        this.particles.splice(i, 1);
        i--;
      }
    }

    // Stop when no more particles
    if (this.particles.length === 0) {
      this.animationComplete = true;
      if (this.canvas) this.canvas.remove();
    }
  }

  private createParticle() {
    return {
      x: Math.random() * this.W,
      y: (Math.random() * this.H) - this.H,
      r: this.randomBetween(10, 30),
      d: (Math.random() * this.mp) + 10,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + .05,
      tiltAngle: 0
    };
  }

  private randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
