import type { LiveCardItem } from "@/lib/live-cards";

import { IdnLiveCard } from "@/components/idn-live-card";
import { ShowroomCard } from "@/components/showroom-card";

type LiveCardsStripProps = {
  items: LiveCardItem[];
};

function renderCard(item: LiveCardItem, key: string, priority = false) {
  const card =
    item.platform === "showroom" ? (
      <ShowroomCard {...item} priority={priority} />
    ) : (
      <IdnLiveCard {...item} priority={priority} />
    );

  return (
    <div key={key} className="shrink-0">
      {card}
    </div>
  );
}

export function LiveCardsStrip({ items }: LiveCardsStripProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-[315px] w-[490px] max-w-full items-center justify-center border border-white/10 bg-black/15 px-6 text-center text-sm text-white/70">
        No member is currently live.
      </div>
    );
  }

  if (items.length <= 2) {
    return (
      <div className="w-[490px] max-w-full overflow-x-auto self-start lg:self-auto">
        <div
          className={`flex min-w-full flex-nowrap gap-2.5 ${
            items.length === 1 ? "justify-end" : "justify-start"
          }`}
        >
          {items.map((item, index) =>
            renderCard(
              item,
              `${item.platform}-${item.memberName}-${item.href}`,
              index < 2
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="live-cards-marquee-mask w-[490px] max-w-full self-start lg:self-auto">
      <div className="live-cards-marquee-track">
        <div className="live-cards-marquee-group">
          {items.map((item, index) =>
            renderCard(
              item,
              `${item.platform}-${item.memberName}-${index}`,
              index < 2
            )
          )}
        </div>
        <div aria-hidden="true" className="live-cards-marquee-group">
          {items.map((item, index) =>
            renderCard(
              item,
              `duplicate-${item.platform}-${item.memberName}-${index}`
            )
          )}
        </div>
      </div>
    </div>
  );
}
