import BottomNav from "@/components/BottomNav";
import { FloatingHomeLogo } from "@/components/FloatingHomeLogo";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-[#E2F3F2] pb-20 lg:pb-0">
            <FloatingHomeLogo />
            {children}
            <NewsletterForm />
            <BottomNav />
        </div>
    );
}

