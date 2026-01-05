import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
	title: "Car Dealer Website",
	description: "A sick car dealer website with AI.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"antialiased overscroll-none bg-background font-sans",
				)}
			>
				<NextTopLoader showSpinner={false} />
				<NuqsAdapter>{children}</NuqsAdapter>
				<Toaster />
			</body>
		</html>
	);
}
