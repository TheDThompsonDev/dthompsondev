import BottomNav from "@/components/navigation/BottomNav";
import { Footer } from "@/components/navigation/Footer";
import { FloatingHomeLogo } from "@/components/navigation/FloatingHomeLogo";
import { CommandPaletteProvider } from "@/components/command-palette/CommandPaletteProvider";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { GlobalContactModal } from "@/components/contact/GlobalContactModal";


export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CommandPaletteProvider>
            <div className="min-h-screen bg-[#E2F3F2] pb-20 lg:pb-0">
                <FloatingHomeLogo />
                {children}
                <Footer />
                <BottomNav />
            </div>
            <CommandPalette />
            <GlobalContactModal />
        </CommandPaletteProvider>
    );
}
