"use client"

import { cn } from "@/lib/utils"

interface ExerciseAnimationProps {
  type: string
  className?: string
}

export function ExerciseAnimation({ type, className }: ExerciseAnimationProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedFigure type={type} />
      </svg>
    </div>
  )
}

function AnimatedFigure({ type }: { type: string }) {
  const strokeColor = "oklch(0.72 0.19 145)"
  const accentColor = "oklch(0.55 0.15 250)"

  switch (type) {
    case "bench-press":
    case "incline-press":
      return (
        <g>
          {/* Bench */}
          <rect x="25" y="72" width="70" height="6" rx="3" fill={accentColor} opacity="0.3" />
          <rect x="30" y="78" width="4" height="16" rx="2" fill={accentColor} opacity="0.2" />
          <rect x="86" y="78" width="4" height="16" rx="2" fill={accentColor} opacity="0.2" />
          {/* Person lying */}
          <circle cx="60" cy="60" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="60;58;60" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="67" x2="60" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms pushing bar */}
          <line x1="60" y1="70" x2="40" y2="52" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="52;42;52" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="70" x2="80" y2="52" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="52;42;52" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Bar */}
          <line x1="32" y1="52" x2="88" y2="52" stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="52;42;52" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="52;42;52" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Weights */}
          <rect x="28" y="48" width="6" height="8" rx="1" fill={strokeColor} opacity="0.6">
            <animate attributeName="y" values="48;38;48" dur="1.5s" repeatCount="indefinite" />
          </rect>
          <rect x="86" y="48" width="6" height="8" rx="1" fill={strokeColor} opacity="0.6">
            <animate attributeName="y" values="48;38;48" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </g>
      )

    case "chest-fly":
    case "crossover":
    case "reverse-fly":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="30" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body */}
          <line x1="60" y1="37" x2="60" y2="70" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="60" y1="70" x2="48" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="70" x2="72" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms fly motion */}
          <line x1="60" y1="48" x2="30" y2="50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="30;45;30" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;38;50" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="48" x2="90" y2="50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="90;75;90" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;38;50" dur="1.8s" repeatCount="indefinite" />
          </line>
          {/* Dumbbells */}
          <circle cx="30" cy="50" r="4" fill={strokeColor} opacity="0.5">
            <animate attributeName="cx" values="30;45;30" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="50;38;50" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="50" r="4" fill={strokeColor} opacity="0.5">
            <animate attributeName="cx" values="90;75;90" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="50;38;50" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      )

    case "push-up":
      return (
        <g>
          {/* Head */}
          <circle cx="30" cy="42" r="6" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="42;52;42" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Body plank */}
          <line x1="36" y1="45" x2="85" y2="60" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="45;55;45" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Arms */}
          <line x1="36" y1="45" x2="36" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="45;55;45" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Legs */}
          <line x1="85" y1="60" x2="95" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Ground */}
          <line x1="15" y1="72" x2="105" y2="72" stroke={accentColor} strokeWidth="1.5" opacity="0.3" />
        </g>
      )

    case "squat":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="25" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="25;35;25" dur="1.8s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="32" x2="60" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="32;42;32" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="y2" values="58;64;58" dur="1.8s" repeatCount="indefinite" />
          </line>
          {/* Arms holding bar */}
          <line x1="42" y1="35" x2="78" y2="35" stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="35;45;35" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="y2" values="35;45;35" dur="1.8s" repeatCount="indefinite" />
          </line>
          {/* Legs */}
          <line x1="60" y1="58" x2="46" y2="85" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="58;64;58" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="x2" values="46;40;46" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="58" x2="74" y2="85" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="58;64;58" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="x2" values="74;80;74" dur="1.8s" repeatCount="indefinite" />
          </line>
          {/* Feet */}
          <line x1="46" y1="85" x2="38" y2="90" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="74" y1="85" x2="82" y2="90" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Weights */}
          <rect x="36" y="31" width="6" height="8" rx="1" fill={strokeColor} opacity="0.5">
            <animate attributeName="y" values="31;41;31" dur="1.8s" repeatCount="indefinite" />
          </rect>
          <rect x="78" y="31" width="6" height="8" rx="1" fill={strokeColor} opacity="0.5">
            <animate attributeName="y" values="31;41;31" dur="1.8s" repeatCount="indefinite" />
          </rect>
        </g>
      )

    case "lat-pulldown":
      return (
        <g>
          {/* Machine frame */}
          <line x1="60" y1="10" x2="60" y2="18" stroke={accentColor} strokeWidth="2" opacity="0.3" />
          <line x1="35" y1="18" x2="85" y2="18" stroke={accentColor} strokeWidth="2" opacity="0.3" />
          {/* Head */}
          <circle cx="60" cy="35" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body */}
          <line x1="60" y1="42" x2="60" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Seat */}
          <rect x="48" y="72" width="24" height="4" rx="2" fill={accentColor} opacity="0.3" />
          {/* Legs */}
          <line x1="55" y1="76" x2="50" y2="92" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="65" y1="76" x2="70" y2="92" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms pulling */}
          <line x1="60" y1="48" x2="38" y2="25" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="25;48;25" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="x2" values="38;42;38" dur="1.6s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="48" x2="82" y2="25" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="25;48;25" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="x2" values="82;78;82" dur="1.6s" repeatCount="indefinite" />
          </line>
          {/* Bar */}
          <line x1="35" y1="22" x2="85" y2="22" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="22;46;22" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="22;46;22" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "bicep-curl":
    case "hammer-curl":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="25" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body */}
          <line x1="60" y1="32" x2="60" y2="68" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="60" y1="68" x2="48" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="68" x2="72" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Left arm - curling */}
          <line x1="60" y1="42" x2="45" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="55" x2="42" y2="42" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="55;35;55" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="42;44;42" dur="1.4s" repeatCount="indefinite" />
          </line>
          {/* Right arm - curling */}
          <line x1="60" y1="42" x2="75" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="75" y1="55" x2="78" y2="42" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="55;35;55" dur="1.4s" repeatCount="indefinite" begin="0.7s" />
            <animate attributeName="x2" values="78;76;78" dur="1.4s" repeatCount="indefinite" begin="0.7s" />
          </line>
          {/* Dumbbells */}
          <rect x="38" y="52" width="8" height="5" rx="1" fill={strokeColor} opacity="0.5">
            <animate attributeName="y" values="52;32;52" dur="1.4s" repeatCount="indefinite" />
          </rect>
          <rect x="74" y="52" width="8" height="5" rx="1" fill={strokeColor} opacity="0.5">
            <animate attributeName="y" values="52;32;52" dur="1.4s" repeatCount="indefinite" begin="0.7s" />
          </rect>
        </g>
      )

    case "tricep-pushdown":
    case "overhead-extension":
    case "skull-crusher":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="25" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body */}
          <line x1="60" y1="32" x2="60" y2="68" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="60" y1="68" x2="48" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="68" x2="72" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Cable from top */}
          <line x1="60" y1="8" x2="60" y2="15" stroke={accentColor} strokeWidth="1.5" opacity="0.3" />
          {/* Arms pushing down */}
          <line x1="60" y1="42" x2="50" y2="50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="62" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="50;68;50" dur="1.3s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="42" x2="70" y2="50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="50" x2="70" y2="62" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="50;68;50" dur="1.3s" repeatCount="indefinite" />
          </line>
          {/* Handle bar */}
          <line x1="46" y1="62" x2="74" y2="62" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="50;68;50" dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;68;50" dur="1.3s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "shoulder-press":
    case "front-raise":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="28" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="28;25;28" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="35" x2="60" y2="68" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="60" y1="68" x2="48" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="68" x2="72" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms pressing up */}
          <line x1="60" y1="45" x2="42" y2="38" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="45;22;45" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="45" x2="78" y2="38" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="45;22;45" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Dumbbells */}
          <rect x="36" y="35" width="10" height="5" rx="1" fill={strokeColor} opacity="0.5">
            <animate attributeName="y" values="42;19;42" dur="1.5s" repeatCount="indefinite" />
          </rect>
          <rect x="74" y="35" width="10" height="5" rx="1" fill={strokeColor} opacity="0.5">
            <animate attributeName="y" values="42;19;42" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </g>
      )

    case "lateral-raise":
    case "shrug":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="25" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body */}
          <line x1="60" y1="32" x2="60" y2="68" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="60" y1="68" x2="48" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="68" x2="72" y2="95" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms raising */}
          <line x1="60" y1="42" x2="38" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="38;25;38" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="55;32;55" dur="1.6s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="42" x2="82" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="82;95;82" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="55;32;55" dur="1.6s" repeatCount="indefinite" />
          </line>
          {/* Dumbbells */}
          <circle cx="38" cy="55" r="4" fill={strokeColor} opacity="0.5">
            <animate attributeName="cx" values="38;25;38" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="55;32;55" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="82" cy="55" r="4" fill={strokeColor} opacity="0.5">
            <animate attributeName="cx" values="82;95;82" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="55;32;55" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>
      )

    case "leg-press":
    case "leg-extension":
    case "leg-curl":
      return (
        <g>
          {/* Seat back */}
          <rect x="25" y="30" width="8" height="40" rx="3" fill={accentColor} opacity="0.2" transform="rotate(-20 29 50)" />
          {/* Head */}
          <circle cx="40" cy="30" r="6" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body reclined */}
          <line x1="40" y1="36" x2="50" y2="65" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs pressing */}
          <line x1="50" y1="65" x2="72" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="72;88;72" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="55;48;55" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="50" y1="65" x2="72" y2="75" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="72;88;72" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="75;68;75" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Platform */}
          <rect x="72" y="42" width="8" height="40" rx="2" fill={strokeColor} opacity="0.4">
            <animate attributeName="x" values="72;88;72" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </g>
      )

    case "lunge":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="22" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="22;30;22" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="29" x2="60" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="29;37;29" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="58;64;58" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Front leg */}
          <line x1="60" y1="58" x2="45" y2="85" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="58;64;58" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="45" y1="85" x2="38" y2="92" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Back leg */}
          <line x1="60" y1="58" x2="78" y2="82" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="58;64;58" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="82;88;82" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="78" y1="82" x2="85" y2="92" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="82;88;82" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Arms */}
          <line x1="60" y1="40" x2="52" y2="52" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="40" x2="68" y2="52" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )

    case "deadlift":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="22" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="22;38;22" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="29" x2="60" y2="60" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="29;45;29" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Legs */}
          <line x1="60" y1="60" x2="48" y2="88" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="60" x2="72" y2="88" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms holding bar */}
          <line x1="60" y1="40" x2="45" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="58;75;58" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="40" x2="75" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="58;75;58" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Bar */}
          <line x1="35" y1="58" x2="85" y2="58" stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="58;75;58" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="58;75;58" dur="2s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "calf-raise":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="18" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="18;14;18" dur="1s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="25" x2="60" y2="60" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="25;21;25" dur="1s" repeatCount="indefinite" />
          </line>
          {/* Arms */}
          <line x1="60" y1="38" x2="48" y2="48" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="38" x2="72" y2="48" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="60" y1="60" x2="52" y2="80" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="60" x2="68" y2="80" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Feet rising */}
          <line x1="48" y1="80" x2="52" y2="80" stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="80;76;80" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="80;76;80" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="68" y1="80" x2="72" y2="80" stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="80;76;80" dur="1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="80;76;80" dur="1s" repeatCount="indefinite" />
          </line>
          {/* Platform */}
          <rect x="40" y="82" width="40" height="4" rx="2" fill={accentColor} opacity="0.3" />
        </g>
      )

    case "crunch":
    case "bicycle-crunch":
      return (
        <g>
          {/* Ground */}
          <line x1="15" y1="78" x2="105" y2="78" stroke={accentColor} strokeWidth="1.5" opacity="0.3" />
          {/* Head */}
          <circle cx="50" cy="52" r="6" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="58;45;58" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="cx" values="50;55;50" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Upper body */}
          <line x1="50" y1="58" x2="60" y2="74" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="64;50;64" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="x1" values="50;55;50" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Legs bent */}
          <line x1="60" y1="74" x2="80" y2="65" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="65" x2="85" y2="78" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms behind head */}
          <line x1="50" y1="55" x2="42" y2="48" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="54;42;54" dur="1.5s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "plank":
      return (
        <g>
          {/* Ground */}
          <line x1="10" y1="72" x2="110" y2="72" stroke={accentColor} strokeWidth="1.5" opacity="0.3" />
          {/* Head */}
          <circle cx="28" cy="48" r="6" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body - plank position */}
          <line x1="34" y1="50" x2="90" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms */}
          <line x1="34" y1="50" x2="30" y2="70" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="90" y1="55" x2="98" y2="70" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Pulsing glow to show tension */}
          <line x1="34" y1="50" x2="90" y2="55" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "leg-raise":
    case "russian-twist":
      return (
        <g>
          {/* Ground */}
          <line x1="15" y1="82" x2="105" y2="82" stroke={accentColor} strokeWidth="1.5" opacity="0.3" />
          {/* Body lying */}
          <circle cx="40" cy="65" r="6" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="46" y1="67" x2="60" y2="75" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs raising */}
          <line x1="60" y1="75" x2="82" y2="70" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="75;45;75" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="x2" values="82;72;82" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="75" x2="85" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="75;47;75" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="x2" values="85;75;85" dur="1.8s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "hip-thrust":
    case "hip-abduction":
    case "kickback":
      return (
        <g>
          {/* Bench */}
          <rect x="25" y="50" width="30" height="6" rx="3" fill={accentColor} opacity="0.3" />
          {/* Head/upper back on bench */}
          <circle cx="42" cy="42" r="6" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="42" y1="48" x2="42" y2="56" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Hips thrusting up */}
          <line x1="42" y1="56" x2="70" y2="50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="56;42;56" dur="1.6s" repeatCount="indefinite" />
          </line>
          {/* Legs */}
          <line x1="70" y1="50" x2="75" y2="78" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="56;42;56" dur="1.6s" repeatCount="indefinite" />
          </line>
          <line x1="75" y1="78" x2="82" y2="82" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Bar on hips */}
          <line x1="55" y1="50" x2="80" y2="50" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" opacity="0.6">
            <animate attributeName="y1" values="56;42;56" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="56;42;56" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "dip":
      return (
        <g>
          {/* Parallel bars */}
          <rect x="30" y="35" width="4" height="60" rx="2" fill={accentColor} opacity="0.3" />
          <rect x="86" y="35" width="4" height="60" rx="2" fill={accentColor} opacity="0.3" />
          {/* Head */}
          <circle cx="60" cy="25" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="25;35;25" dur="1.6s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="32" x2="60" y2="62" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="32;42;32" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="62;72;62" dur="1.6s" repeatCount="indefinite" />
          </line>
          {/* Arms on bars */}
          <line x1="60" y1="38" x2="34" y2="40" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="38;48;38" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="40;40;40" dur="1.6s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="38" x2="86" y2="40" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="38;48;38" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="40;40;40" dur="1.6s" repeatCount="indefinite" />
          </line>
          {/* Legs */}
          <line x1="60" y1="62" x2="55" y2="82" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="62;72;62" dur="1.6s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="62" x2="65" y2="82" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="62;72;62" dur="1.6s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "bent-row":
    case "seated-row":
      return (
        <g>
          {/* Head */}
          <circle cx="45" cy="28" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          {/* Body bent over */}
          <line x1="48" y1="34" x2="65" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="65" y1="58" x2="55" y2="88" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="65" y1="58" x2="75" y2="88" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Arms rowing */}
          <line x1="52" y1="42" x2="42" y2="60" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="60;42;60" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="52" y1="42" x2="48" y2="60" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y2" values="60;42;60" dur="1.5s" repeatCount="indefinite" />
          </line>
          {/* Dumbbell */}
          <line x1="36" y1="60" x2="54" y2="60" stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <animate attributeName="y1" values="60;42;60" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="60;42;60" dur="1.5s" repeatCount="indefinite" />
          </line>
        </g>
      )

    case "treadmill":
    case "cycling":
    case "elliptical":
    case "jump-rope":
      return (
        <g>
          {/* Head */}
          <circle cx="60" cy="22" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5">
            <animate attributeName="cy" values="22;18;22" dur="0.6s" repeatCount="indefinite" />
          </circle>
          {/* Body */}
          <line x1="60" y1="29" x2="60" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="y1" values="29;25;29" dur="0.6s" repeatCount="indefinite" />
          </line>
          {/* Arms swinging */}
          <line x1="60" y1="38" x2="48" y2="50" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="48;52;48" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="50;44;50" dur="0.6s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="38" x2="72" y2="44" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="72;68;72" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="44;50;44" dur="0.6s" repeatCount="indefinite" />
          </line>
          {/* Left leg */}
          <line x1="60" y1="55" x2="48" y2="78" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="48;55;48" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="78;72;78" dur="0.6s" repeatCount="indefinite" />
          </line>
          {/* Right leg */}
          <line x1="60" y1="55" x2="72" y2="72" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="x2" values="72;65;72" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="72;78;72" dur="0.6s" repeatCount="indefinite" />
          </line>
          {/* Ground/treadmill */}
          <rect x="35" y="82" width="50" height="4" rx="2" fill={accentColor} opacity="0.3" />
          {/* Motion lines */}
          <line x1="42" y1="84" x2="48" y2="84" stroke={accentColor} strokeWidth="1" opacity="0.4">
            <animate attributeName="x1" values="42;35;42" dur="0.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="48;42;48" dur="0.4s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="84" x2="68" y2="84" stroke={accentColor} strokeWidth="1" opacity="0.4">
            <animate attributeName="x1" values="60;52;60" dur="0.4s" repeatCount="indefinite" />
            <animate attributeName="x2" values="68;60;68" dur="0.4s" repeatCount="indefinite" />
          </line>
        </g>
      )

    default:
      return (
        <g>
          {/* Default standing figure */}
          <circle cx="60" cy="28" r="7" fill="none" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="60" y1="35" x2="60" y2="65" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="45" x2="42" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="45" x2="78" y2="55" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="65" x2="48" y2="90" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="65" x2="72" y2="90" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Pulse */}
          <circle cx="60" cy="50" r="18" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      )
  }
}
