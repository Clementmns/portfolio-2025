"use client";

import React, { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LangSelect } from "./lang-select";
import { ThemeSelect } from "./theme-select";
import { FontSelect } from "./font-select";
import { SeasonSelect } from "./season-select";
import { useRouter } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { fontClassMap } from "@/lib/fonts";
import type { Locale } from "@/types/locales";
import { Seasons, getSeasonByDate } from "@/types/seasons";
import { updateSettingsAction } from "@/actions/update-settings-action";

export function SettingsForm({
  className,
  onSuccess,
}: React.ComponentProps<"form"> & {
  onSuccess?: () => void;
}) {
  const t = useTranslations("Header");
  const tg = useTranslations("Generic");
  const router = useRouter();
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const locale = formData.get("lang") as string;
    const theme = formData.get("theme") as string;
    const season = formData.get("season") as string;
    const font = formData.get("font") as string;

    if (theme) {
      setTheme(theme);
    }

    if (season) {
      const actualSeasons = Seasons.filter((s) => s !== "auto");
      actualSeasons.forEach((s) => document.body.classList.remove(s));
      const seasonToApply =
        season === "auto" ? getSeasonByDate(new Date()) : season;
      document.body.classList.add(seasonToApply);
    }

    if (font) {
      const currentFontClasses = Object.values(fontClassMap);
      currentFontClasses.forEach((fontClass) =>
        document.body.classList.remove(fontClass)
      );
      if (fontClassMap[font as keyof typeof fontClassMap]) {
        document.body.classList.add(
          fontClassMap[font as keyof typeof fontClassMap]
        );
      }
    }

    if (locale && pathname) {
      const currentLocale = pathname.split("/")[1];
      if (locale !== currentLocale) {
        const pathWithoutLocale = pathname.replace(/^\/[a-zA-Z-]+(\/|$)/, "/");
        router.push(pathWithoutLocale, { locale: locale as Locale });
      }
    }

    startTransition(async () => {
      await updateSettingsAction(formData);
      router.refresh();
      onSuccess?.();
    });
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <Label htmlFor="lang">{t("formLangLabel")}</Label>
        <LangSelect />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="theme">{t("formThemeLabel")}</Label>
        <ThemeSelect />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="season">{t("formSeasonLabel")}</Label>
        <SeasonSelect />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="font">{t("formFontLabel")}</Label>
        <FontSelect />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        aria-label={tg("buttonSave")}
      >
        {isPending ? "Saving..." : tg("buttonSave")}
      </Button>
    </form>
  );
}
