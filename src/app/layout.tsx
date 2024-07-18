import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TerminalMovieDB",
    description: "Created by justlikemax (1187384354108874822)",
};

const fontHeading = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-heading",
});

const fontBody = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-body",
});

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "antialiased",
                    fontHeading.variable,
                    fontBody.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
