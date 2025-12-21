import BottomNav from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FloatingHomeLogo } from "@/components/FloatingHomeLogo";


export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-[#E2F3F2] pb-20 lg:pb-0">
            <FloatingHomeLogo />
            {children}
            <Footer />
            <BottomNav />
        </div>
    );
}

