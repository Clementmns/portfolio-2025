import { HiHeart } from "react-icons/hi";
import { PiCoffeeFill } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="w-full text-xs font-mono text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Made with</span>
          <span role="img" aria-label="love">
            <HiHeart />
          </span>
          <span>and</span>
          <span role="img" aria-label="coffee">
            <PiCoffeeFill />
          </span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} Clément Omnès</span>
        </div>
      </div>
    </footer>
  );
}
