import type { Favourites } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { ClassifiedStatus } from "@prisma/client";
import { LatestArrivalsCarousel } from "./latest-arrivals-carousel";

export const LatestArrivals = async () => {
	const classifieds = await prisma.classified.findMany({
		where: { status: ClassifiedStatus.LIVE },
		take: 6,
		include: { 
			images: true,
			make: true,
			model: true,
			modelVariant: true
		},
		orderBy: { createdAt: 'desc' }
	});

	const sourceId = await getSourceId();
	const favourites = await redis.get<Favourites>(sourceId || "");
	
	return (
		<section className="py-24 sm:py-32 relative overflow-hidden bg-brand-gray-50">
			{/* Light Background with Subtle Patterns */}
			<div className="absolute inset-0 bg-gradient-to-br from-white via-brand-gray-50 to-brand-gray-100"></div>
			<div className="absolute inset-0 bg-gradient-to-t from-brand-gray-100/50 via-transparent to-white/50"></div>
			
			{/* Floating Elements */}
			<div className="absolute top-20 left-10 w-32 h-32 bg-brand-navy-200/20 rounded-full blur-xl floating-element"></div>
			<div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-red-200/20 rounded-full blur-xl floating-element" style={{animationDelay: '1s'}}></div>
			<div className="absolute top-1/2 left-1/3 w-24 h-24 bg-brand-navy-100/30 rounded-full blur-lg floating-element" style={{animationDelay: '2s'}}></div>

			<div className="container mx-auto max-w-[85vw] relative z-10">
				<div className="text-center mb-16">
					{/* Enhanced Card for Title with Light Background */}
					<div className="bg-white/80 backdrop-blur-xl border border-brand-gray-200/50 rounded-2xl p-12 mb-8 mx-auto max-w-4xl shadow-xl">
						<h2 className="text-4xl font-bold tracking-tight text-brand-navy-900 sm:text-6xl mb-6">
							<span className="bg-gradient-to-r from-brand-navy-900 via-brand-navy-800 to-brand-navy-900 bg-clip-text text-transparent">
								Latest Premium Arrivals
							</span>
						</h2>
						<p className="text-xl text-brand-navy-700 max-w-3xl mx-auto leading-relaxed font-medium">
							Discover our curated collection of exceptional vehicles, each representing the pinnacle of automotive excellence and luxury craftsmanship.
						</p>
						<div className="w-32 h-1.5 bg-gradient-to-r from-brand-navy-400 via-brand-red-500 to-brand-navy-400 mx-auto mt-8 rounded-full shadow-lg"></div>
					</div>
				</div>

				{/* Enhanced Carousel Container */}
				<div className="bg-white/60 backdrop-blur-xl border border-brand-gray-200/50 rounded-2xl p-8 shadow-xl">
					<LatestArrivalsCarousel
						classifieds={classifieds}
						favourites={favourites ? favourites.ids : []}
					/>
				</div>
			</div>
		</section>
	);
};
