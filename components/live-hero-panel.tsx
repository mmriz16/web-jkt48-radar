"use client";

import { useEffect, useRef, useState } from "react";

import { LiveCardsStrip } from "@/components/live-cards-strip";
import { LiveNowBadge } from "@/components/live-now-badge";
import type { LiveCardsFeed } from "@/lib/live-cards";

type LiveHeroPanelProps = {
  initialFeed: LiveCardsFeed;
};

export function LiveHeroPanel({ initialFeed }: LiveHeroPanelProps) {
  const [liveFeed, setLiveFeed] = useState(initialFeed);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;

    const refresh = async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(`/api/live-feed?ts=${Date.now()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) return;
        const nextFeed = (await response.json()) as LiveCardsFeed;
        if (!mounted) return;
        setLiveFeed(nextFeed);
      } catch {
        // Keep the latest successful payload on transient failures.
      }
    };

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    }, 10000);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      mounted = false;
      abortRef.current?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (liveFeed.liveCount <= 0) {
    return null;
  }

  const showSeeMore = liveFeed.liveCount > 2;

  return (
    <div className="flex w-[490px] max-w-full flex-col items-stretch gap-2.5">
      <div
        className={`flex w-full items-center gap-2.5 ${
          showSeeMore ? "justify-between" : "justify-end"
        }`}
      >
        <LiveNowBadge label={`${liveFeed.liveCount} Live Now`} />
        {showSeeMore ? (
          <a href="" className="text-white">
            See More
          </a>
        ) : null}
      </div>
      <LiveCardsStrip items={liveFeed.items} />
    </div>
  );
}
