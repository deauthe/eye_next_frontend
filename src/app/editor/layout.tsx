import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "../store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Design Editor",
    description: "Custom t-shirt design editor",
};

export default function EditorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <div className="mt-24">{children}</div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}