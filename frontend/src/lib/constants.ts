export const API_BASE_URL = import.meta.env.DEV
  ? "http://127.0.0.1:5000"
  : "https://api-alternify.vercel.app"

export const servicesAvailable = [
  "genius",
  "youtube",
  "youtube-music",
  "deezer",
  "amazon",
  "apple",
  "musixmatch",
  "letras",
  "soundcloud",
  "spotify",
  "tidal"
] as const;

export const assets = {
  genius: "/genius.png",
  youtube: "/youtube.svg",
  'youtube-music': "/youtube-music.svg",
  spotify: "/spotify.svg",
  apple: "/apple-music.svg",
  deezer: "/deezer.svg",
  soundcloud: "/soundcloud.svg",
  musixmatch: "/musixmatch.png",
  amazon: "/amazon-music.png",
  tidal: "/tidal.svg",
} as const;

export const spinner = `\
<svg class="mr-2 size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M6 12c0-1.7.7-3.2 1.8-4.2"></path>
  <circle cx="12" cy="12" r="2"></circle>
  <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"></path>
</svg>
`;

export const share = `\
<button
  class="flex items-center bg-pink-500 text-white rounded-full px-2 h-7 group"
  aria-label="Copy Link"
  data-id="copy"
>
  <svg
    class="size-3 group-hover:scale-110 transition-transform"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" x2="12" y1="2" y2="15"></line>
  </svg>
</button>
`;

export const shareArrow = `\
<div class="hidden sm:flex absolute -top-4 -right-[250px] md:-right-[300px]">
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 449.8174124426354 62.99398816300754"
    width="899.6348248852707"
    height="125.98797632601509"
    class="w-[230px] md:w-[280px] h-fit"
  >
    <!-- svg-source:excalidraw -->
    <defs>
      <style class="style-fonts">
        @font-face {
          font-family: Virgil;
          src: url(data:font/woff2;base64,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);
        }
      </style>
    </defs>
    <rect
      x="0"
      y="0"
      width="449.8174124426354"
      height="62.99398816300754"
      fill="transparent"></rect><g
      transform="translate(151.32222036826818 10) rotate(0 144.2475960371836 19.740491340602716)"
      ><text
        x="0"
        y="27.82619659371368"
        font-family="Virgil, Segoe UI Emoji"
        font-size="31.584786144964447px"
        fill="#ec4899"
        text-anchor="start"
        style="white-space: pre;"
        direction="ltr"
        dominant-baseline="alphabetic">share with friends!</text
      ></g
    ><g stroke-linecap="round"
      ><g
        transform="translate(136.63575279918362 32.85223422254239) rotate(0 -63.31787639959181 5.615787998250198)"
        ><path
          d="M0 0 C-10.66 -1.49, -42.83 -12.27, -63.94 -8.91 C-85.04 -5.55, -116.19 15.3, -126.64 20.14"
          stroke="#ec4899"
          stroke-width="1.5"
          fill="none"
          stroke-dasharray="8 9"></path></g
      ><g
        transform="translate(136.63575279918362 32.85223422254239) rotate(0 -63.31787639959181 5.615787998250198)"
        ><path
          d="M-110.16 1.34 C-115.88 7.86, -121.59 14.39, -126.64 20.14"
          stroke="#ec4899"
          stroke-width="1.5"
          fill="none"></path></g
      ><g
        transform="translate(136.63575279918362 32.85223422254239) rotate(0 -63.31787639959181 5.615787998250198)"
        ><path
          d="M-101.93 16.33 C-110.5 17.65, -119.07 18.98, -126.64 20.14"
          stroke="#ec4899"
          stroke-width="1.5"
          fill="none"></path></g
      ></g
    ><mask></mask></svg
  >
</div>`;

export const socials = `\
<div id="socials" class="animate-fade-in-up relative flex space-x-3 h-[50px] mt-3">
  <button
    class="flex items-center bg-pink-500 text-white rounded-full px-2.5 h-10 group"
    aria-label="Copy Link"
    data-id="copy"
  >
    <svg
      class="size-5 group-hover:scale-110 transition-transform"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  </button>
  <button
    class="flex items-center bg-[#01e676] text-white rounded-full px-2.5 h-10 group overflow-hidden"
    aria-label="Share on WhatsApp"
    data-title={title}
    data-id="whatsapp"
  >
    <svg
      class="size-5 group-hover:scale-110 transition-transform"
      viewBox="0 0 256 259"
      width="256"
      height="259"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      ><path
        d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
        fill="#00E676"></path><path
        d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
        fill="#FFF"></path>
    </svg>
  </button>
  <button
    class="flex items-center bg-black text-white rounded-full px-3 h-10 group"
    aria-label="Share on X"
    data-title={title}
    data-id="x"
  >
    <svg
      class="size-4 group-hover:scale-110 transition-transform"
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="1227"
      fill="none"
      viewBox="0 0 1200 1227"
      ><path
        fill="#fff"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      ></path></svg
    >
  </button>
  ${shareArrow}
</div>`;
