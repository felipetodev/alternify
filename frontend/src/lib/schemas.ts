import { z } from "zod";
import { servicesAvailable } from "./constants";

const spotifyTrackIdSchema = z.string().length(22);

const spotifyUrlSchema = z
  .string()
  .regex(/\bhttps?:\/\/[^/]*\bspotify\.com\/track\/([^\s?]+)/)
  .min(1);

const spotifyTrackSchema = z.union([
  spotifyUrlSchema,
  spotifyTrackIdSchema,
]);

export function validateInput(url: string) {
  return spotifyTrackSchema.safeParse(url);
}

export function validateTrackId(id: string | null) {
  return spotifyTrackIdSchema.safeParse(id);
}

const shareSchema = z.object({
  id: z.string().length(22),
  artist: z.string().min(1),
  results: z
    .string()
    .min(1)
    .refine((value) => {
      const listOfUrls = value.split("&");

      listOfUrls.forEach((result) => {
        const [key] = result.split("=");

        if (!servicesAvailable.includes(key as any)) {
          return false;
        }
      });

      return true;
    }, { message: "🔑" }),
})

export function validateShareRequest(id: string, params: URLSearchParams) {
  return shareSchema.safeParse({
    id,
    artist: params.get('artist'),
    results: params.get('results')
  })
}
