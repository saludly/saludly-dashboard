import { useEffect } from "react";
import { X } from "lucide-react";
import { statusLabel, type Biomarker } from "../../data/biomarkers";
import { dotClass, rangePosition, rangeWindow, softClass, textClass } from "./status";

const GUIDANCE: Record<string, string> = {
  optimal: "This marker sits comfortably inside its optimal window. Keep doing what you are doing.",
  attention:
    "This marker is drifting outside its optimal window. It is not urgent, but it is worth watching and re-testing at your next panel.",
  critical:
    "This marker is meaningfully outside its optimal window. We recommend discussing it with a clinician before your next panel.",
};

export function BiomarkerDetail({
  biomarker,
  onClose,
}: {
  biomarker: Biomarker | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!biomarker) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [biomarker, onClose]);

  const open = biomarker !== null;
  const pos = biomarker ? rangePosition(biomarker.value, biomarker.low, biomarker.high) : 0;
  const win = biomarker ? rangeWindow(biomarker.low, biomarker.high) : { start: 0, width: 0 };

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-scrim backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={biomarker?.name ?? "Biomarker detail"}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-background transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {biomarker && (
          <div className="px-7 py-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {biomarker.category}
                </span>
                <h3 className="mt-2 text-2xl font-light tracking-tight text-ink">
                  {biomarker.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="rounded-full border border-rule p-2 text-ink-muted transition-colors hover:bg-secondary hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 flex items-end justify-between">
              <div className="flex items-baseline gap-2">
                <span className={`font-mono text-5xl tabular-nums ${textClass[biomarker.status]}`}>
                  {biomarker.value}
                </span>
                <span className="text-sm text-ink-faint">{biomarker.unit}</span>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em] ${softClass[biomarker.status]}`}
              >
                {statusLabel[biomarker.status]}
              </span>
            </div>

            <div className="mt-8">
              <div className="relative h-1.5 w-full rounded-full bg-rule">
                <div
                  className="absolute inset-y-0 rounded-full bg-optimal-soft"
                  style={{ left: `${win.start}%`, width: `${win.width}%` }}
                />
                <div
                  className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background ${dotClass[biomarker.status]}`}
                  style={{ left: `${pos}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[11px] tabular-nums text-ink-faint">
                <span>optimal from {biomarker.low}</span>
                <span>to {biomarker.high}</span>
              </div>
            </div>

            <div className="mt-9 space-y-6">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  What it measures
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{biomarker.about}</p>
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  What your result means
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {GUIDANCE[biomarker.status]}
                </p>
              </div>
              <div className="rounded-2xl bg-surface p-5">
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  Reference range
                </h4>
                <p className="mt-2 font-mono text-sm tabular-nums text-ink">
                  {biomarker.low} – {biomarker.high} {biomarker.unit}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                  Sample values shown for demonstration. Saludly is not a medical device and this
                  view does not constitute medical advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
