type LiveStreamUpdatesLabelProps = {
  label?: string;
};

function CornerAccent({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1.5 w-1.5 border-white ${className}`}
    />
  );
}

export function LiveStreamUpdatesLabel({
  label = "Live Stream Updates",
}: LiveStreamUpdatesLabelProps) {
  return (
    <div className="relative flex items-center justify-center gap-2.5 border-[0.5px] border-white/50 px-2.5 py-2.5 text-sm font-medium text-white">
      <span>{label}</span>

      <CornerAccent className="left-[-0.5px] top-[-0.5px] border-l-[0.5px] border-t-[0.5px]" />
      <CornerAccent className="right-[-0.5px] top-[-0.5px] border-r-[0.5px] border-t-[0.5px]" />
      <CornerAccent className="bottom-[-0.5px] left-[-0.5px] border-b-[0.5px] border-l-[0.5px]" />
      <CornerAccent className="bottom-[-0.5px] right-[-0.5px] border-b-[0.5px] border-r-[0.5px]" />
    </div>
  );
}
