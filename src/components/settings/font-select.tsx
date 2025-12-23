import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Font } from "@/types/fonts";
import { fontClassMap } from "@/lib/fonts";

export function FontSelect() {
  const t = useTranslations("Header");
  let font: Font = "spaceGrotesk";
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|; )user-font=([^;]*)/);
    const cookieFont = match?.[1] as Font | undefined;
    if (
      cookieFont === "spaceGrotesk" ||
      cookieFont === "geist" ||
      cookieFont === "noto" ||
      cookieFont === "openDyslexic"
    ) {
      font = cookieFont;
    }
  }

  return (
    <Select defaultValue={font} name="font" aria-label={t("formFontLabel")}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("formFontPlaceholder")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="spaceGrotesk"
          className={`${fontClassMap["spaceGrotesk"]} antialiased`}
        >
          {t("formFontOptionSpaceGrotesk")}
        </SelectItem>
        <SelectItem
          value="geist"
          className={`${fontClassMap["geist"]} antialiased`}
        >
          {t("formFontOptionGeist")}
        </SelectItem>
        <SelectItem
          value="noto"
          className={`${fontClassMap["noto"]} antialiased`}
        >
          {t("formFontOptionNoto")}
        </SelectItem>
        <SelectItem
          value="openDyslexic"
          className={`${fontClassMap["openDyslexic"]} antialiased`}
        >
          {t("formFontOptionOpenDyslexic")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
