import { buildMemberCutoutUrl } from "@/lib/member-cutout";

export type Platform = "showroom" | "idn";

type RawRecord = Record<string, unknown>;

type MemberProfile = {
  name: string;
  nickname?: string;
  photo?: string;
};

type LiveSourceRecord = {
  room_url_key?: string;
  main_name?: string;
  image?: string;
  view_num?: number;
  started_at?: number;
  is_live?: boolean;
  live_url?: string;
};

export type LiveCardItem = {
  platform: Platform;
  href: string;
  memberName: string;
  title: string;
  japaneseName?: string;
  imageSrc?: string;
  isLive: boolean;
  stats: [string, string];
};

export type LiveCardsFeed = {
  items: LiveCardItem[];
  liveCount: number;
  isFallback: boolean;
};

const LIVE_API_URL =
  "https://api.termicons.com/jkt48/live?fields=room_url_key|main_name|image|view_num|started_at|is_live|live_url";
const MEMBERS_API_URL =
  "https://api.termicons.com/jkt48/members?fields=name|nickname|photo|slug|team";

const fallbackItems: LiveCardItem[] = [
  {
    platform: "showroom",
    href: "https://www.showroom-live.com/",
    memberName: "Kathrina",
    japaneseName: "\u30ab\u30c8\u30ea\u30ca",
    title: "Kathrina Irene - JKT48",
    imageSrc: "/images/showroom-kathrina.png",
    isLive: false,
    stats: ["Stand by", "No live now"],
  },
  {
    platform: "idn",
    href: "https://www.idn.app/live",
    memberName: "Gracie",
    japaneseName: "\u30b0\u30ec\u30a4\u30b7",
    title: "Grace Octaviani - JKT48",
    imageSrc: "/images/idn-gracie.png",
    isLive: false,
    stats: ["Stand by", "No live now"],
  },
];

function asRecord(value: unknown): RawRecord | null {
  return typeof value === "object" && value !== null
    ? (value as RawRecord)
    : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function formatViewerCount(value: number | undefined): string {
  return value !== undefined ? `${value.toLocaleString("en-US")} Views` : "Live Now";
}

function formatStartedAt(value: number | undefined): string {
  if (!value) return "Live Now";

  const parsed = new Date(value * 1000);
  if (Number.isNaN(parsed.getTime())) return "Live Now";

  return `${new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(parsed)} WIB`;
}

function parseLiveNames(mainName: string | undefined): {
  memberName?: string;
  japaneseName?: string;
} {
  if (!mainName) return {};

  if (mainName.includes("/")) {
    const [rawMember, rawJapanese] = mainName.split("/", 2);
    return {
      memberName: rawMember.trim() || undefined,
      japaneseName:
        rawJapanese
          ?.replace(/\s*\uFF08JKT48\uFF09\s*/g, "")
          .trim() || undefined,
    };
  }

  return {
    memberName: mainName.replace(/\s+JKT48\s*$/i, "").trim() || undefined,
  };
}

function parseFullName(mainName: string | undefined, memberName: string): string {
  if (!mainName) {
    return `${memberName} - JKT48`;
  }

  const cleaned = mainName
    .split("/", 1)[0]
    .replace(/\s+JKT48\s*$/i, "")
    .trim();

  return `${cleaned || memberName} - JKT48`;
}

function parseHref(
  platform: Platform,
  roomUrlKey: string | undefined,
  liveUrl: string | undefined
): string {
  if (liveUrl) return liveUrl;

  if (!roomUrlKey) {
    return platform === "showroom"
      ? "https://www.showroom-live.com/"
      : "https://www.idn.app/live";
  }

  const safeRoomKey = encodeURIComponent(roomUrlKey);

  return platform === "showroom"
    ? `https://www.showroom-live.com/r/${safeRoomKey}`
    : `https://www.idn.app/${safeRoomKey}`;
}

function matchMemberProfile(
  members: MemberProfile[],
  memberName: string | undefined
): MemberProfile | undefined {
  if (!memberName) return undefined;

  const normalizedName = normalizeText(memberName);

  return members.find((member) => {
    const nickname = member.nickname ? normalizeText(member.nickname) : "";
    const fullName = normalizeText(member.name);

    return (
      normalizedName === nickname ||
      normalizedName === fullName ||
      fullName.includes(normalizedName) ||
      nickname.includes(normalizedName)
    );
  });
}

async function fetchJson(url: string): Promise<unknown> {
  const apiKey = process.env.API_KEYS;
  if (!apiKey) {
    throw new Error("Missing API_KEYS environment variable");
  }

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with status ${response.status}`);
  }

  return response.json();
}

function parseMembersPayload(payload: unknown): MemberProfile[] {
  if (Array.isArray(payload)) {
    return payload
      .map((item) => asRecord(item))
      .filter((item): item is RawRecord => item !== null)
      .map((item) => ({
        name: asString(item.name) ?? "",
        nickname: asString(item.nickname),
        photo: asString(item.photo),
      }))
      .filter((item) => item.name);
  }

  const root = asRecord(payload);
  const values = Array.isArray(root?.value) ? root.value : [];

  return values
    .map((item) => asRecord(item))
    .filter((item): item is RawRecord => item !== null)
    .map((item) => ({
      name: asString(item.name) ?? "",
      nickname: asString(item.nickname),
      photo: asString(item.photo),
    }))
    .filter((item) => item.name);
}

function parseLiveGroup(
  platform: Platform,
  value: unknown,
  members: MemberProfile[]
): LiveCardItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => asRecord(item))
    .filter((item): item is RawRecord => item !== null)
    .map((item) => {
      const liveItem: LiveSourceRecord = {
        room_url_key: asString(item.room_url_key),
        main_name: asString(item.main_name),
        image: asString(item.image),
        view_num: asNumber(item.view_num),
        started_at: asNumber(item.started_at),
        is_live: item.is_live === true,
        live_url: asString(item.live_url),
      };

      const names = parseLiveNames(liveItem.main_name);
      const memberName =
        names.memberName ??
        (platform === "showroom" ? "Showroom Live" : "IDN Live");
      const matchedMember = matchMemberProfile(members, memberName);

      return {
        platform,
        href: parseHref(platform, liveItem.room_url_key, liveItem.live_url),
        memberName,
        japaneseName: names.japaneseName,
        title: parseFullName(liveItem.main_name, memberName),
        imageSrc:
          buildMemberCutoutUrl(matchedMember?.photo) ??
          liveItem.image ??
          fallbackItems.find((item) => item.platform === platform)?.imageSrc,
        isLive: liveItem.is_live ?? true,
        stats: [
          formatViewerCount(liveItem.view_num),
          liveItem.is_live ? "Live Now" : formatStartedAt(liveItem.started_at),
        ],
      } satisfies LiveCardItem;
    });
}

export async function getLiveCards(): Promise<LiveCardsFeed> {
  try {
    const [livePayload, membersPayload] = await Promise.all([
      fetchJson(LIVE_API_URL),
      fetchJson(MEMBERS_API_URL),
    ]);

    const liveRoot = asRecord(livePayload);
    const members = parseMembersPayload(membersPayload);

    const items = [
      ...parseLiveGroup("showroom", liveRoot?.live_showroom, members),
      ...parseLiveGroup("idn", liveRoot?.live_idn, members),
    ].filter((item) => item.isLive);

    return {
      items,
      liveCount: items.length,
      isFallback: false,
    };
  } catch {
    return {
      items: fallbackItems,
      liveCount: fallbackItems.filter((item) => item.isLive).length,
      isFallback: true,
    };
  }
}
