//component line for progress

interface Props {
  //for progress from 0 to 1
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  // for saving frame
  const clamped = Math.max(0, Math.min(1, progress));
  //convert into percentage
  const pct = Math.round(clamped * 100);

  return (
    <div
      aria-label="progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      role="progressbar"
      style={{
        height: 10,
        width: "100%",
        background: "rgba(255,255,255,0.5)",
        borderRadius: 999,
        overflow: "hidden",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08)",
        margin: "12px 0 24px",
      }}
    >
      {/* inmer part that visually represent progress*/}
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, #eca2b0ff 0%, #e76d86ff 60%, #cd517aff 100%)",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}
