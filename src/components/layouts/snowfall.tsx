import { getCurrentSeason } from "@/lib/current-season";
import SnowfallOverlay from "@/components/seasons/winter/snowfall-overlay";

export default async function SnowfallLayout() {
  const currentSeason = await getCurrentSeason();

  if (currentSeason !== "winter") {
    return null;
  }

  return <SnowfallOverlay />;
}
