import { SettingsDialog } from "@/components/settings/settings-dialog";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="container mx-auto max-w-7xl px-4 py-4 flex items-start justify-end">
        <div className="pointer-events-auto">
          <SettingsDialog />
        </div>
      </div>
    </header>
  );
}
