import Navbar from "@/components/navigation/Navbar";

export default function StandardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-[32px] shadow-xl m-2 sm:m-4 overflow-hidden border border-[#4D7DA3]/10">
                <Navbar />
                <main id="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
