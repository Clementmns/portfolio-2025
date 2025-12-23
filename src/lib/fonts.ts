import { Geist, Noto_Sans, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { Font } from "@/types/fonts";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const geist = Geist({
  subsets: ["latin"],
});

export const noto = Noto_Sans({
  subsets: ["latin"],
});

export const openDyslexic = localFont({
  src: [
    {
      path: "../assets/fonts/OpenDyslexic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/OpenDyslexic-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/OpenDyslexic-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/OpenDyslexic-Bold-Italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const fontClassMap: Record<Font, string> = {
  spaceGrotesk: spaceGrotesk.className,
  geist: geist.className,
  openDyslexic: openDyslexic.className,
  noto: noto.className,
};
