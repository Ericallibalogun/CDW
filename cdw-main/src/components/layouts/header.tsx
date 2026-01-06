import { auth } from "@/auth";
import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import type { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { HeartIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignOutForm } from "../auth/sign-out-form";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

export const PublicHeader = async () => {
	const session = await auth();
	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId ?? "");
	
	return (
		<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-16 px-6 gap-x-8">
			{/* Logo - Left Side */}
			<div className="absolute left-6 flex items-center">
				<Link href={routes.home} className="flex items-center gap-2 floating-element">
					<Image
						width={120}
						height={40}
						alt="logo"
						className="h-10 w-auto object-contain drop-shadow-lg"
						src="/mide_logo-removebg-preview.png"
						priority
						quality={90}
					/>
				</Link>
			</div>
			
			{/* Centered Navigation */}
			<nav className="hidden md:block">
				{navLinks.map((link) => (
					<Link
						className="font-heading px-6 py-2 text-sm text-white hover:text-white/80 duration-300 transition-all ease-in-out font-semibold uppercase tracking-wide rounded-lg drop-shadow-lg mx-2"
						href={link.href}
						key={link.id}
					>
						{link.label}
					</Link>
				))}
			</nav>
			
			{/* Right Side Actions */}
			<div className="absolute right-6 flex items-center gap-4">
				{session ? (
					<div className="flex items-center gap-4">
						<Link 
							href={routes.admin.dashboard} 
							className="text-white hover:text-white/80 font-semibold transition-colors duration-200 px-4 py-2 rounded-lg drop-shadow-lg"
						>
							Backoffice
						</Link>
						<SignOutForm />
					</div>
				) : (
					<Button
						asChild
						variant="ghost"
						size="icon"
						className="relative inline-block group rounded-full"
					>
						<Link href={routes.favourites}>
							<div className="flex group-hover:bg-brand-red-600 transition-all ease-in-out items-center justify-center w-10 h-10 bg-white/30 rounded-full border border-white/50 group-hover:border-brand-red-400 shadow-lg">
								<HeartIcon className="w-5 h-5 text-brand-red-600 group-hover:text-white group-hover:fill-white transition-all duration-300" />
							</div>
							<div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-white bg-gradient-to-r from-brand-red-600 to-brand-red-700 rounded-full group-hover:from-brand-navy-600 group-hover:to-brand-navy-700 transition-all duration-300 shadow-lg">
								<span className="text-xs font-bold">
									{favourites ? favourites.ids.length : 0}
								</span>
							</div>
						</Link>
					</Button>
				)}
				
				{/* Mobile Menu */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden border-none rounded-full">
							<MenuIcon className="h-5 w-5 text-white drop-shadow-lg" />
							<SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-full max-w-xs p-6 glass-card border-l border-white/30 bg-brand-navy-900/95 backdrop-blur-xl">
						<nav className="grid gap-3 mt-8">
							{navLinks.map((link) => (
								<Link
									className="flex items-center gap-3 py-4 px-6 text-sm font-medium text-white hover:text-white hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 border border-transparent hover:border-white/30"
									href={link.href}
									key={link.id}
								>
									{link.label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};
