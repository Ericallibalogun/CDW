import { imageSources } from "@/config/constants";
import { routes } from "@/config/routes";
import type { AwaitedPageProps } from "@/config/types";
import { imgixLoader } from "@/lib/imgix-loader";
import { prisma } from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { ClassifiedStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomepageTaxonomyFilters } from "./homepage-filters";
import { SearchButton } from "./search-button";

export const HeroSection = async (props: AwaitedPageProps) => {
	const { searchParams } = props;
	const totalFiltersApplied = Object.keys(searchParams || {}).length;
	const isFilterApplied = totalFiltersApplied > 0;

	const classifiedsCount = await prisma.classified.count({
		where: buildClassifiedFilterQuery(searchParams),
	});

	const minMaxResult = await prisma.classified.aggregate({
		where: { status: ClassifiedStatus.LIVE },
		_min: {
			year: true,
			price: true,
			odoReading: true,
		},
		_max: {
			price: true,
			year: true,
			odoReading: true,
		},
	});

	return (
		<section className="relative flex items-center justify-center min-h-screen overflow-hidden pt-16">
			{/* Optimized Background Image with Next.js Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src={imageSources.carLinup}
					alt="Premium car lineup background"
					fill
					className="object-cover object-center"
					priority
					quality={85}
					placeholder="blur"
					blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
				/>
			</div>
			
			{/* Enhanced overlay for better text visibility */}
			<div className="absolute inset-0 bg-gradient-to-r from-brand-navy-950/80 via-brand-navy-900/70 to-brand-navy-800/60 z-10" />
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10" />
			
			<div className="container lg:grid space-y-12 lg:space-y-0 grid-cols-2 items-center relative z-20 py-12">
				<div className="px-6 lg:px-0">
					{/* Enhanced text with better visibility */}
					<h1 className="text-3xl text-center lg:text-left md:text-5xl lg:text-8xl uppercase font-extrabold text-white drop-shadow-2xl leading-tight">
						<span className="bg-gradient-to-r from-white via-white to-brand-gray-100 bg-clip-text text-transparent">
							Unbeatable Deals on 
						</span>
						<br />
						<span className="bg-gradient-to-r from-brand-navy-200 via-white to-brand-navy-100 bg-clip-text text-transparent">
							Premium Cars
						</span>
					</h1>
					<h2 className="mt-6 uppercase text-center lg:text-left text-lg md:text-2xl lg:text-4xl text-white/90 drop-shadow-lg font-bold">
						Discover your dream car today
					</h2>
				</div>
				
				{/* Glassmorphism Form */}
				<div className="max-w-md w-full mx-auto">
					<div className="premium-card p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
						<div className="space-y-6">
							<div className="text-center mb-6">
								<h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">Find Your Perfect Vehicle</h3>
								<p className="text-white/80 text-sm">Search our premium collection</p>
							</div>
							
							<div className="space-y-4 flex flex-col w-full">
								<HomepageTaxonomyFilters
									minMaxValues={minMaxResult}
									searchParams={searchParams}
								/>
							</div>
							
							<SearchButton count={classifiedsCount} />
							
							{isFilterApplied && (
								<Button
									asChild
									variant="outline"
									className="w-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-brand-navy-900 transition-all duration-300"
								>
									<Link href={routes.home}>
										Clear Filters ({totalFiltersApplied})
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
