import type { TrackLink } from '@/lib/types';

export const $ = <T extends HTMLElement>(el: string) =>
  document.querySelector(el) as T;
export const $$ = <T extends HTMLElement>(el: string) =>
  document.querySelectorAll(el) as NodeListOf<T>;

export function createShareUrl(data: TrackLink[], artist: string) {
  const params = new URLSearchParams();
  data.forEach(source => {
    const [key, value] = Object.entries(source)[0];
    params.append(key, value as string);
  });

  const encodedArtist = encodeURIComponent(artist);
  const encodedParams = encodeURIComponent(params.toString());

  return {
    shareUrl: `?artist=${encodedArtist}&results=${params.toString()}`,
    urlEncoded: `?artist=${encodedArtist}&results=${encodedParams}`,
  }
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

export function addSocialMessage(
  type: "whatsapp" | "x",
  artist: string,
  url: string,
  trackId: string,
) {
  let urlWithText = "";

  fetch("/api/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: trackId,
      url,
    }),
  }).then((res) => {
    if (res.ok) {
      const encodeUrlMessage = encodeURIComponent(
        generatePostMessage(
          artist,
          `${window.origin}/share/${trackId}`,
        ),
      );
      if (type === "x") {
        urlWithText = `https://x.com/intent/tweet?text=${encodeUrlMessage}`;
      } else if (type === "whatsapp") {
        urlWithText = `https://wa.me/?text=${encodeUrlMessage}`;
      }
      window.open(urlWithText, "_blank");
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
