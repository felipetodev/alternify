import type { TrackLink } from '@/lib/types';

export const $ = <T extends HTMLElement>(el: string) =>
  document.querySelector(el) as T;
export const $$ = <T extends HTMLElement>(el: string) =>
  document.querySelectorAll(el) as NodeListOf<T>;

export function createShareUrl(data: TrackLink[], artist: string, image: string) {
  const params = new URLSearchParams();
  data.forEach(source => {
    const [key, value] = Object.entries(source)[0];
    params.append(key, value as string);
  });

  const encodedArtist = encodeURIComponent(artist);
  const encodedParams = encodeURIComponent(params.toString());
  const encodedImage = encodeURIComponent(image);

  return `?artist=${encodedArtist}&results=${encodedParams}&image=${encodedImage}`;
}

export function addClipboardEvent(el: NodeListOf<HTMLElement>) {
  el.forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      const url = target.getAttribute("data-url");
      navigator.clipboard.writeText(url!);
      window.toast({
        title: "Link copied to clipboard!",
        location: "bottom-center",
        dismissible: true,
        type: "success",
        icon: true,
      });
    });
  });
}

export function createSocialsUrl({
  id: type,
  artist,
  urlEncoded: url,
  image,
  trackId,
}: {
  id: "copy" | "whatsapp" | "x";
  artist: string;
  urlEncoded: string;
  trackId: string;
  image: string;
}) {
  fetch("/api/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: trackId,
      url,
      image,
    }),
  }).then((res) => {
    if (res.ok) {
      if (type === "copy") {
        return navigator.clipboard.writeText(
          `${window.origin}/share/${trackId}`,
        );
      }

      sharePost({ artist, trackId, type });
    } else {
      return window.toast({
        title: "We are unable to generate a share links on social media at the moment. Please try again later.",
        location: "bottom-center",
        dismissible: true,
        type: "error",
        icon: true,
      });
    }
  });
}

export function generatePostMessage(title: string, href: string) {
  return `\
Here are some alternatives to "${title}" on #Alternify!

${href}`;
}

export function sharePost({ artist, trackId, type }: { artist: string, trackId: string, type: "whatsapp" | "x" }) {
  const encodeUrlMessage = encodeURIComponent(
    generatePostMessage(
      artist,
      `${window.origin}/share/${trackId}`,
    ),
  );

  let urlWithText = "";

  if (type === "x") {
    urlWithText = `https://x.com/intent/tweet?text=${encodeUrlMessage}`;
  } else if (type === "whatsapp") {
    urlWithText = `https://wa.me/?text=${encodeUrlMessage}`;
  }

  window.open(urlWithText, "_blank");
}
