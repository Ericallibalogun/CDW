import { routes } from "@/config/routes";
import { MultiStepFormEnum } from "@/config/types";
import {
	formatBodyType,
	formatColour,
	formatFuelType,
	formatNumber,
	formatOdometerUnit,
	formatPrice,
	formatTransmission,
	formatUlezCompliance,
} from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import {
	CarFrontIcon,
	CarIcon,
	CheckIcon,
	Fingerprint,
	FuelIcon,
	GaugeIcon,
	PowerIcon,
	UsersIcon,
	XIcon,
	Star,
	Shield,
	Award,
	Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HTMLParser } from "../shared/html-parser";
import { Button } from "../ui/button";
import { ClassifiedCarousel } from "./classified-carousel";

type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
	include: { make: true; images: true };
}>;

const features = (props: ClassifiedWithImagesAndMake) => [
	{
		id: 1,
		icon:
			props.ulezCompliance === "EXEMPT" ? (
				<CheckIcon className="w-6 h-6 text-green-500" />
			) : (
				<XIcon className="w-6 h-6 text-red-500" />
			),
		label: "ULEZ",
		value: formatUlezCompliance(props.ulezCompliance),
	},
	{
		id: 2,
		icon: <Fingerprint className="w-6 h-6 text-blue-500" />,
		label: "Registration",
		value: props.vrm || "Available on request",
	},
	{
		id: 3,
		icon: <CarIcon className="w-6 h-6 text-blue-500" />,
		label: "Body Type",
		value: formatBodyType(props.bodyType),
	},
	{
		id: 4,
		icon: <FuelIcon className="w-6 h-6 text-blue-500" />,
		label: "Fuel Type",
		value: formatFuelType(props.fuelType),
	},
	{
		id: 5,
		icon: <PowerIcon className="w-6 h-6 text-blue-500" />,
		label: "Transmission",
		value: formatTransmission(props.transmission),
	},
	{
		id: 6,
		icon: <GaugeIcon className="w-6 h-6 text-blue-500" />,
		label: "Mileage",
		value: `${formatNumber(props.odoReading)} ${formatOdometerUnit(props.odoUnit)}`,
	},
	{
		id: 7,
		icon: <UsersIcon className="w-6 h-6 text-blue-500" />,
		label: "Seats",
		value: props.seats.toString(),
	},
	{
		id: 8,
		icon: <CarFrontIcon className="w-6 h-6 text-blue-500" />,
		label: "Doors",
		value: props.doors.toString(),
	},
];

export const ClassifiedView = (props: ClassifiedWithImagesAndMake) => {
	return (
		<div className="min-h-screen relative overflow-hidden" style={{paddingTop: '5rem'}}>
			{/* Modern Background */}
			<div className="absolute inset-0 gradient-mesh"></div>
			<div className="absolute inset-0 bg-gradient-to-br from-brand-blue-900/30 via-transparent to-brand-gray-900/40"></div>
			
			{/* Floating Background Elements */}
			<div className="absolute top-32 left-20 w-64 h-64 bg-brand-blue-400/10 rounded-full blur-3xl floating-element"></div>
			<div className="absolute bottom-32 right-20 w-80 h-80 bg-brand-red-400/10 rounded-full blur-3xl floating-element" style={{animationDelay: '1.5s'}}></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl floating-element" style={{animationDelay: '3s'}}></div>

			{/* Hero Section */}
			<div className="relative z-10 py-16">
				<div className="container mx-auto px-4 md:px-8">
					<div className="premium-card p-12 mb-12">
						<div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
							<div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
								<Image
									src={props.make.image || "/images/brands/placeholder-logo.svg"}
									alt={props.make.name}
									width={48}
									height={48}
									className="object-contain drop-shadow-lg"
								/>
							</div>
							<div className="text-center md:text-left">
								<p className="text-brand-blue-300 font-semibold text-xl mb-2 drop-shadow-sm">{props.make.name}</p>
								<h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">{props.title}</h1>
							</div>
						</div>
						
						<div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
							<span className="bg-gradient-to-r from-brand-blue-500 to-brand-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-sm border border-white/20">
								{props.year}
							</span>
							<span className="glass text-white px-6 py-3 rounded-full font-medium shadow-lg">
								{formatNumber(props.odoReading)} {formatOdometerUnit(props.odoUnit)}
							</span>
							<span className="glass text-white px-6 py-3 rounded-full font-medium shadow-lg">
								{formatColour(props.colour)}
							</span>
							<span className="glass text-white px-6 py-3 rounded-full font-medium shadow-lg">
								{formatFuelType(props.fuelType)}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 md:px-8 pb-16 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Image Gallery */}
					<div className="space-y-8">
						<div className="premium-card p-6">
							<ClassifiedCarousel images={props.images} />
						</div>
						
						{/* Premium Features */}
						<div className="premium-card p-8">
							<h3 className="text-2xl font-bold text-white mb-8 flex items-center">
								<Award className="w-7 h-7 text-brand-blue-400 mr-4" />
								Premium Features
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center space-x-4 p-4 bg-green-500/10 backdrop-blur-sm rounded-xl border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
									<Shield className="w-6 h-6 text-green-400" />
									<span className="text-sm font-medium text-green-100">Warranty Included</span>
								</div>
								<div className="flex items-center space-x-4 p-4 bg-brand-blue-500/10 backdrop-blur-sm rounded-xl border border-brand-blue-400/20 hover:border-brand-blue-400/40 transition-all duration-300">
									<Star className="w-6 h-6 text-brand-blue-400" />
									<span className="text-sm font-medium text-brand-blue-100">Premium Certified</span>
								</div>
								<div className="flex items-center space-x-4 p-4 bg-purple-500/10 backdrop-blur-sm rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
									<Zap className="w-6 h-6 text-purple-400" />
									<span className="text-sm font-medium text-purple-100">Performance Tuned</span>
								</div>
								<div className="flex items-center space-x-4 p-4 bg-yellow-500/10 backdrop-blur-sm rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
									<Award className="w-6 h-6 text-yellow-400" />
									<span className="text-sm font-medium text-yellow-100">Luxury Package</span>
								</div>
							</div>
						</div>
					</div>

					{/* Vehicle Details */}
					<div className="space-y-8">
						{/* Price Section */}
						<div className="premium-card p-10 text-center">
							<div className="bg-gradient-to-r from-brand-blue-500/20 to-brand-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-brand-blue-400/30">
								<p className="text-brand-blue-300 text-xl font-medium mb-4">Our Premium Price</p>
								<p className="text-6xl font-bold mb-8 text-white drop-shadow-lg">
									{formatPrice({ price: props.price, currency: props.currency })}
								</p>
								<Button
									className="bg-gradient-to-r from-brand-blue-500 to-brand-blue-600 hover:from-brand-blue-600 hover:to-brand-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg w-full transition-all duration-300 transform hover:scale-105 shadow-2xl border border-brand-blue-400/30"
									size="lg"
									asChild
								>
									<Link href={routes.reserve(props.slug, MultiStepFormEnum.WELCOME)}>
										Reserve This Vehicle
									</Link>
								</Button>
							</div>
						</div>

						{/* Description */}
						{props.description && (
							<div className="premium-card p-8">
								<h3 className="text-2xl font-bold text-white mb-6">Vehicle Description</h3>
								<div className="prose prose-lg text-white/80 leading-relaxed">
									<HTMLParser html={props.description} />
								</div>
							</div>
						)}

						{/* Specifications */}
						<div className="premium-card p-8">
							<h3 className="text-2xl font-bold text-white mb-8">Specifications</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{features(props).map(({ id, icon, label, value }) => (
									<div
										key={id}
										className="flex items-center space-x-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
									>
										<div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
											{icon}
										</div>
										<div>
											<p className="text-sm font-medium text-white/60">{label}</p>
											<p className="text-lg font-semibold text-white">{value}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Contact Section */}
						<div className="premium-card p-8">
							<h3 className="text-2xl font-bold text-white mb-4">Interested in this vehicle?</h3>
							<p className="text-white/70 mb-8 leading-relaxed">
								Contact our premium sales team for a personalized consultation and exclusive viewing appointment.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									variant="outline"
									className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-brand-gray-900 flex-1 py-3 rounded-xl transition-all duration-300"
									asChild
								>
									<Link href="/contact">Contact Sales Team</Link>
								</Button>
								<Button
									className="bg-gradient-to-r from-brand-red-500 to-brand-red-600 hover:from-brand-red-600 hover:to-brand-red-700 text-white flex-1 py-3 rounded-xl transition-all duration-300 shadow-lg"
									asChild
								>
									<Link href={routes.reserve(props.slug, MultiStepFormEnum.WELCOME)}>
										Schedule Viewing
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
