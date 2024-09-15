import type { assets } from "@/lib/constants";

export type Service = keyof typeof assets;

export type TrackLink = {
  [K in Service]: string;
};
