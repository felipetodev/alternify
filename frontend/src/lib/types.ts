import type { assets } from "./constants";

export type Company = keyof typeof assets;

export type TrackLink = {
  [K in Company]: string;
};
