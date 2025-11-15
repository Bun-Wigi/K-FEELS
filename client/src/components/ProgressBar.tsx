import { motion } from "framer-motion";

interface Props {
  progress: number; // 0 → 1
}

export default function ProgressBar({ progress }: Props) {
  const clamped = Math.max(0, Math.min(1, progress));
  const pct = Math.round(clamped * 100);

  return (
    <div
      role="progressbar"
      aria-label="progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      style={{
        width: "100%",
        height: 16,
        borderRadius: 12,
        background: "rgba(255, 241, 245, 0.5)",
        boxShadow: "inset 0 3px 8px rgba(0,0,0,0.05)",
        overflow: "hidden",
        margin: "16px 0 24px",
        position: "relative",
      }}
    >
      {/* glowing progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          height: "100%",
          borderRadius: 12,
          background: "linear-gradient(135deg, #ffd1b3, #ffafcc)",
          boxShadow: "0 6px 20px rgba(255, 95, 155, 0.6)",
        }}
      />
    </div>
  );
}
