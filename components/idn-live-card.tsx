import Image from "next/image";
import Link from "next/link";

type IdnLiveCardProps = {
  memberName?: string;
  japaneseName?: string;
  title?: string;
  stats?: [string, string];
  href?: string;
  ctaLabel?: string;
  imageSrc?: string;
  isLive?: boolean;
  priority?: boolean;
};

function CornerAccent({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-1.5 w-1.5 border-white ${className}`}
    />
  );
}

export function IdnLiveCard({
  memberName = "Gracie",
  japaneseName = "\u30b0\u30ec\u30a4\u30b7",
  title = "Grace Octaviani - JKT48",
  stats = ["1,862 Views", "1,862 Views"],
  href = "https://www.idn.app/live",
  ctaLabel = "Watch on IDN Live",
  imageSrc = "/images/idn-gracie.png",
  isLive = false,
  priority = false,
}: IdnLiveCardProps) {
  return (
    <article className="relative w-[240px] min-w-[240px] max-w-[240px] border-[0.5px] border-white/50 p-2.5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <div className="flex items-center justify-end bg-[#cc0000]">
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
          <Image
            src="/images/idn-live-logo.svg"
            alt="IDN Live"
            width={95}
            height={29}
            className="h-auto w-[95px]"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />

          <div className="flex flex-col items-center text-white">
            <p className="text-center text-base font-medium leading-none">
              {memberName}
            </p>
            {japaneseName ? (
              <p className="mt-1 text-base leading-none font-black">
                {japaneseName}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative h-[123px] w-[88px] shrink-0">
          <Image
            src={imageSrc}
            alt={memberName}
            fill
            className="object-cover"
            sizes="88px"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-0.5 font-medium">
        <p className="text-base text-white">{title}</p>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/70">
          <span>{stats[0]}</span>
          <span>{stats[1]}</span>
        </div>
      </div>

      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex w-full items-center justify-center bg-[#cc0000] px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-[#e00000]"
      >
        {isLive ? ctaLabel : "Open IDN Live"}
      </Link>

      <CornerAccent className="left-[-0.5px] top-[-0.5px] border-l-[0.5px] border-t-[0.5px]" />
      <CornerAccent className="right-[-0.5px] top-[-0.5px] border-r-[0.5px] border-t-[0.5px]" />
      <CornerAccent className="bottom-[-0.5px] left-[-0.5px] border-b-[0.5px] border-l-[0.5px]" />
      <CornerAccent className="bottom-[-0.5px] right-[-0.5px] border-b-[0.5px] border-r-[0.5px]" />
    </article>
  );
}
