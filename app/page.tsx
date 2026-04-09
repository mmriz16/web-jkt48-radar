import { LiveHeroPanel } from "@/components/live-hero-panel";
import { LiveStreamUpdatesLabel } from "@/components/live-stream-updates-label";
import { getLiveCards } from "@/lib/live-cards";
import { Navbar } from "@/components/navbar";

export default async function Home() {
  const liveFeed = await getLiveCards();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="relative isolate min-h-screen overflow-hidden bg-[#111214]">
          <Navbar activeHref="/" overlay />

          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/home_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #111214 0%, rgba(17, 18, 20, 0) 50%, #111214 100%)",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.14),transparent_30%)]" />

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-end gap-12 px-6 pb-12 pt-32 sm:px-10 sm:pb-14 sm:pt-36 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-24 lg:pb-20 lg:pt-40">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/55">
                TRUSTED BY 10,000+ FANS
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                All-in-one access
                <br />
                to JKT48 Live
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Watch member activity, check theater schedules, follow live
                streaming updates, and stay in sync with JKT48 in real time.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <LiveStreamUpdatesLabel label="Live Stream Updates" />
                <LiveStreamUpdatesLabel label="Theater Schedules" />
                <LiveStreamUpdatesLabel label="Member Activity" />
                <LiveStreamUpdatesLabel label="Realtime Alerts" />
              </div>
            </div>

            <LiveHeroPanel initialFeed={liveFeed} />
          </div>
        </section>
      </main>
    </div>
  );
}
