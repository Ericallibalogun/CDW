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
		<section className="py-24 sm:py-32 relative overflow-hidden">
			{/* Modern Gradient Background */}
			<div className="absolute inset-0 gradient-mesh opacity-90"></div>
			<div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/20 via-transparent to-brand-gray-900/30"></div>
			
			{/* Floating Elements */}
			<div className="absolute top-20 left-10 w-32 h-32 bg-brand-blue-400/10 rounded-full blur-xl floating-element"></div>
			<div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-red-400/10 rounded-full blur-xl floating-element" style={{animationDelay: '1s'}}></div>
			<div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg floating-element" style={{animationDelay: '2s'}}></div>

			<div className="container mx-auto max-w-[85vw] relative z-10">
				<div className="text-center mb-16">
					{/* Glass Card for Title */}
					<div className="premium-card p-12 mb-8 mx-auto max-w-4xl">
						<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-lg">
							Latest Premium Arrivals
						</h2>
						<p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
							Discover our curated collection of exceptional vehicles, each representing the pinnacle of automotive excellence and luxury craftsmanship.
						</p>
						<div className="w-32 h-1.5 bg-gradient-to-r from-brand-blue-400 via-white to-brand-red-400 mx-auto mt-8 rounded-full shadow-lg"></div>
					</div>
				</div>

				{/* Enhanced Carousel Container */}
				<div className="premium-card p-8">
					<LatestArrivalsCarousel
						classifieds={classifieds}
						favourites={favourites ? favourites.ids : []}
					/>
				</div>
			</div>
		</section>
	);
};
