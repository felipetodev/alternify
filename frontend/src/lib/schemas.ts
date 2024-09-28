import { z } from "zod";
import { servicesAvailable } from "@/lib/constants";
import type { Service } from "@/lib/types";

const spotifyTrackIdSchema = z.string().length(22);

const spotifyUrlSchema = z
  .string()
  .regex(/\bhttps?:\/\/[^/]*\bspotify\.com\/(intl-[a-z]{2}\/)?track\/([^\s?]+)/)
  .transform((url) => {
    const match = url.match(/\/track\/([a-zA-Z0-9]{22})/);
    return match ? match[1] : null;
  })
  .refine((value) => {
    return value !== null;
  });

const spotifyTrackSchema = z.union([
  spotifyUrlSchema,
  spotifyTrackIdSchema,
]);

export function validateInput(url: string) {
  return spotifyTrackSchema.safeParse(url);
}

export function validateTrackId(id?: string) {
  return spotifyTrackIdSchema.safeParse(id);
}

const paramsSearchSchema = z.object({
  artist: z.string().min(1),
  results: z
    .string()
    .min(1)
    .refine((value) => {
      const listOfUrls = value.split("&");

      listOfUrls.forEach((result) => {
        const [key] = result.split("=");

        if (!servicesAvailable.includes(key as Service)) {
          return false;
        }
      });

      return true;
    }, { message: "🔑" }),
  image: z.string().url(),
})

const shareSchema = z.object({
  id: spotifyTrackIdSchema,
}).and(paramsSearchSchema);

export function validateShareRequest(id: string, params: URLSearchParams) {
  return shareSchema.safeParse({
    id,
    artist: params.get('artist'),
    results: params.get('results'),
    image: params.get('image')
  })
}
