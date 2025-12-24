import BottomNav from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FloatingHomeLogo } from "@/components/FloatingHomeLogo";
import { CommandPaletteProvider } from "@/components/CommandPaletteProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { GlobalContactModal } from "@/components/GlobalContactModal";
import { FloatingSearchButton } from "@/components/FloatingSearchButton";


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
            <FloatingSearchButton />
        </CommandPaletteProvider>
    );
}
