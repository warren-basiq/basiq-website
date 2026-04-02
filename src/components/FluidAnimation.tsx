import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ──────────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  hue: number;
  trail: { x: number; y: number }[];
}

/* ─── Phase labels ───────────────────────────────────────────────── */

const phases = [
  { label: "Individual", sublabel: "A single point of light" },
  { label: "Team", sublabel: "Moving in formation" },
  { label: "Conversation", sublabel: "Exchange and rhythm" },
  { label: "Project", sublabel: "Flowing into structure" },
  { label: "Company", sublabel: "One living network" },
];

/* ─── Constants ──────────────────────────────────────────────────── */

const PHASE_DURATION = 4000;
const TRANSITION_DURATION = 1500;
const TOTAL_CYCLE = phases.length * PHASE_DURATION;
const PARTICLE_COUNT = 60;
const TRAIL_LENGTH = 12;

/* ─── Helpers ────────────────────────────────────────────────────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function FluidAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let lastTime = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = container!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    const w = () => container!.getBoundingClientRect().width;
    const h = () => container!.getBoundingClientRect().height;
    const cx = () => w() / 2;
    const cy = () => h() / 2;

    // Initialize particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: cx(),
          y: cy(),
          vx: 0,
          vy: 0,
          targetX: cx(),
          targetY: cy(),
          radius: 2,
          baseRadius: 1.5 + Math.random() * 2,
          alpha: 0,
          hue: 35 + Math.random() * 15,
          trail: [],
        });
      }
    }

    function getPhaseTargets(phase: number, i: number, t: number, particles: Particle[]) {
      const cxv = cx();
      const cyv = cy();
      const wv = w();
      const hv = h();

      switch (phase) {
        /* ─── Individual: single droplet pulsing ─── */
        case 0: {
          const breathe = Math.sin(t * 0.003) * 20;
          const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + t * 0.001;
          const spread = i === 0 ? 0 : 8 + breathe * (i / PARTICLE_COUNT);
          return {
            x: cxv + Math.cos(angle) * spread,
            y: cyv + Math.sin(angle) * spread,
            radius: i === 0 ? 4 : particles[i].baseRadius * (i < 5 ? 1.2 : 0.4),
            alpha: i === 0 ? 1 : i < 8 ? 0.7 : 0.15,
          };
        }

        /* ─── Team: splits into formation clusters ─── */
        case 1: {
          const groupCount = 5;
          const group = i % groupCount;
          const groupAngle = (group / groupCount) * Math.PI * 2 + t * 0.0005;
          const orbitRadius = 80 + Math.sin(t * 0.002 + group) * 15;
          const localAngle = ((i / PARTICLE_COUNT) * Math.PI * 8) + t * 0.002;
          const localRadius = 12 + Math.sin(t * 0.003 + i) * 5;
          return {
            x: cxv + Math.cos(groupAngle) * orbitRadius + Math.cos(localAngle) * localRadius,
            y: cyv + Math.sin(groupAngle) * orbitRadius + Math.sin(localAngle) * localRadius,
            radius: particles[i].baseRadius * 0.9,
            alpha: 0.5 + (group === Math.floor(t / 800) % groupCount ? 0.4 : 0),
          };
        }

        /* ─── Conversation: two groups exchanging particles ─── */
        case 2: {
          const isLeft = i < PARTICLE_COUNT / 2;
          const sway = Math.sin(t * 0.002) * 60;
          const exchange = Math.sin(t * 0.0015 + i * 0.3) * 0.5 + 0.5;
          const baseX = isLeft ? cxv - 100 : cxv + 100;
          const crossX = isLeft ? cxv + 100 : cxv - 100;
          const useX = lerp(baseX, crossX, exchange > 0.7 ? (exchange - 0.7) / 0.3 : 0);
          const angle = (i * 0.5) + t * 0.002;
          const spread = 25 + Math.sin(t * 0.003 + i) * 10;
          return {
            x: useX + Math.cos(angle) * spread + sway * (exchange > 0.7 ? 0.3 : 0),
            y: cyv + Math.sin(angle) * spread * 1.5,
            radius: particles[i].baseRadius * (exchange > 0.7 ? 1.3 : 0.8),
            alpha: 0.3 + exchange * 0.5,
          };
        }

        /* ─── Project: flowing into channels ─── */
        case 3: {
          const streamCount = 4;
          const stream = i % streamCount;
          const streamY = cyv - 60 + (stream / (streamCount - 1)) * 120;
          const flowSpeed = 0.05 + (stream * 0.01);
          const flowX = ((i * 37 + t * flowSpeed) % (wv + 100)) - 50;
          const wave = Math.sin(flowX * 0.02 + stream * Math.PI * 0.5) * (15 - stream * 2);
          return {
            x: flowX,
            y: streamY + wave,
            radius: particles[i].baseRadius * 0.7,
            alpha: 0.3 + Math.sin(t * 0.002 + i * 0.2) * 0.3,
          };
        }

        /* ─── Company: full network constellation ─── */
        case 4: {
          const cols = 8;
          const rows = Math.ceil(PARTICLE_COUNT / cols);
          const col = i % cols;
          const row = Math.floor(i / cols);
          const spacingX = (wv * 0.7) / (cols - 1);
          const spacingY = (hv * 0.6) / (rows - 1);
          const baseX = wv * 0.15 + col * spacingX;
          const baseY = hv * 0.2 + row * spacingY;
          const drift = Math.sin(t * 0.001 + i * 0.5) * 8;
          const pulse = Math.sin(t * 0.003 + col * 0.5 + row * 0.3);
          return {
            x: baseX + drift,
            y: baseY + Math.cos(t * 0.0015 + i * 0.3) * 6,
            radius: particles[i].baseRadius * (0.8 + pulse * 0.3),
            alpha: 0.4 + pulse * 0.3,
          };
        }

        default:
          return { x: cxv, y: cyv, radius: 2, alpha: 0.5 };
      }
    }

    function drawConnections(particles: Particle[], phase: number, _t: number) {
      if (phase < 1) return;

      const maxDist = phase === 4 ? 100 : phase === 3 ? 60 : 80;

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          if (d < maxDist) {
            const strength = (1 - d / maxDist) * Math.min(particles[i].alpha, particles[j].alpha) * 0.4;
            ctx.strokeStyle = `hsla(38, 90%, 65%, ${strength})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function render(timestamp: number) {
      const dt = lastTime ? timestamp - lastTime : 16;
      lastTime = timestamp;
      timeRef.current += dt;

      const t = timeRef.current;
      const cycleTime = t % TOTAL_CYCLE;
      const phaseIndex = Math.floor(cycleTime / PHASE_DURATION);
      const phaseTime = cycleTime % PHASE_DURATION;

      setCurrentPhase(phaseIndex);

      const width = w();
      const height = h();

      // Clear with fade trail
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Calculate blend between current and next phase during transition
      const isTransitioning = phaseTime > PHASE_DURATION - TRANSITION_DURATION;
      const transitionProgress = isTransitioning
        ? easeInOut((phaseTime - (PHASE_DURATION - TRANSITION_DURATION)) / TRANSITION_DURATION)
        : 0;
      const nextPhase = (phaseIndex + 1) % phases.length;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const current = getPhaseTargets(phaseIndex, i, t, particles);

        let targetX = current.x;
        let targetY = current.y;
        let targetRadius = current.radius;
        let targetAlpha = current.alpha;

        if (isTransitioning) {
          const next = getPhaseTargets(nextPhase, i, t, particles);
          targetX = lerp(current.x, next.x, transitionProgress);
          targetY = lerp(current.y, next.y, transitionProgress);
          targetRadius = lerp(current.radius, next.radius, transitionProgress);
          targetAlpha = lerp(current.alpha, next.alpha, transitionProgress);
        }

        // Smooth follow
        const ease = 0.04;
        p.vx += (targetX - p.x) * ease;
        p.vy += (targetY - p.y) * ease;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        p.radius = lerp(p.radius, targetRadius, 0.08);
        p.alpha = lerp(p.alpha, targetAlpha, 0.06);

        // Trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL_LENGTH) p.trail.pop();
      }

      // Draw connections
      drawConnections(particles, phaseIndex, t);

      // Draw trails
      for (const p of particles) {
        if (p.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = `hsla(${p.hue}, 85%, 60%, ${p.alpha * 0.15})`;
          ctx.lineWidth = p.radius * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // Draw particles
      for (const p of particles) {
        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${p.alpha * 0.5})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 85%, 55%, ${p.alpha * 0.15})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    // Initial clear
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w(), h());

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Phase indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {phases.map((phase, i) => (
          <button
            key={phase.label}
            onClick={() => {
              timeRef.current = i * PHASE_DURATION;
              setCurrentPhase(i);
            }}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
              currentPhase === i
                ? "bg-amber-400/15 text-amber-400"
                : "text-[#706d67] hover:text-[#a09d97]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                currentPhase === i ? "bg-amber-400" : "bg-[#706d67]/50"
              }`}
            />
            {phase.label}
          </button>
        ))}
      </div>

      {/* Phase label */}
      <div className="absolute left-8 top-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-amber-400/60">
              {phases[currentPhase].label}
            </p>
            <p className="mt-1 font-body text-sm text-[#a09d97]">
              {phases[currentPhase].sublabel}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
