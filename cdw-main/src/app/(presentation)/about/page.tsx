import { Metadata } from "next";
import { Crown, Shield, Star, Award, Users, Clock, Sparkles, Car } from "lucide-react";

export const metadata: Metadata = {
	title: "About Us | Majestic Motors",
	description: "Learn more about Majestic Motors - your trusted partner for luxury and premium vehicles.",
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			{/* Hero Section with Parallax Effect */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/80"></div>
				<div className="absolute inset-0 opacity-20">
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
				</div>
				
				<div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
					<div className="text-center">
						<div className="flex justify-center mb-8">
							<div className="p-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-2xl">
								<Crown className="w-12 h-12 text-white" />
							</div>
						</div>
						<h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
							About Majestic Motors
						</h1>
						<p className="mt-8 text-xl leading-8 text-slate-200 max-w-4xl mx-auto">
							Where automotive excellence meets unparalleled luxury. We don't just sell cars – 
							we curate extraordinary experiences for the most discerning clientele.
						</p>
						<div className="mt-12 flex justify-center">
							<div className="animate-bounce">
								<div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
									<div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Stats Section */}
			<div className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ number: "15+", label: "Years of Excellence", icon: Award },
							{ number: "500+", label: "Luxury Vehicles Sold", icon: Car },
							{ number: "98%", label: "Client Satisfaction", icon: Star },
							{ number: "24/7", label: "Concierge Service", icon: Clock },
						].map((stat, index) => (
							<div key={index} className="text-center group">
								<div className="flex justify-center mb-4">
									<div className="p-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
										<stat.icon className="w-8 h-8 text-amber-400" />
									</div>
								</div>
								<div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
								<div className="text-slate-600 font-medium">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Our Story Section */}
			<div className="py-20 bg-gradient-to-r from-slate-50 to-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-20"></div>
							<div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
								<div className="flex items-center mb-6">
									<Sparkles className="w-8 h-8 text-amber-500 mr-3" />
									<h2 className="text-3xl font-bold text-slate-900">
										Our Legacy
									</h2>
								</div>
								<p className="text-slate-600 mb-6 leading-relaxed">
									Born from a passion for automotive perfection, Majestic Motors represents the pinnacle 
									of luxury car curation. Our journey began with a simple yet ambitious vision: to redefine 
									what it means to acquire a luxury vehicle.
								</p>
								<p className="text-slate-600 mb-6 leading-relaxed">
									Every vehicle in our collection tells a story of engineering excellence, design mastery, 
									and uncompromising quality. From rare vintage classics to cutting-edge hypercars, 
									we specialize in the extraordinary.
								</p>
								<div className="flex items-center text-amber-600 font-semibold">
									<Crown className="w-5 h-5 mr-2" />
									<span>Curated for Connoisseurs</span>
								</div>
							</div>
						</div>
						
						<div className="space-y-6">
							<div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-2xl text-white shadow-2xl">
								<h3 className="text-2xl font-bold mb-6 flex items-center">
									<Shield className="w-7 h-7 mr-3 text-amber-400" />
									The Majestic Promise
								</h3>
								<div className="space-y-4">
									{[
										"Hand-selected vehicles from prestigious marques worldwide",
										"Comprehensive 200-point inspection process",
										"Exclusive access to limited edition and bespoke models",
										"White-glove delivery and concierge services",
										"Lifetime relationship management and support",
										"Investment-grade documentation and provenance"
									].map((feature, index) => (
										<div key={index} className="flex items-start group">
											<div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
											<span className="text-slate-200 group-hover:text-white transition-colors duration-300">{feature}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Luxury Brands Showcase */}
			<div className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-slate-900 mb-4">
							Prestigious Partnerships
						</h2>
						<p className="text-xl text-slate-600 max-w-3xl mx-auto">
							We maintain exclusive relationships with the world's most coveted automotive brands
						</p>
					</div>
					
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
						{[
							"Ferrari", "Lamborghini", "Porsche", "McLaren", "Aston Martin", "Bentley",
							"Rolls-Royce", "Maserati", "Bugatti", "Koenigsegg", "Pagani", "Mercedes-AMG"
						].map((brand, index) => (
							<div key={index} className="text-center p-4 hover:bg-slate-50 rounded-lg transition-all duration-300 hover:scale-105">
								<div className="text-lg font-bold text-slate-800">{brand}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Experience Section */}
			<div className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
				</div>
				
				<div className="relative max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-16">
						<div className="flex justify-center mb-6">
							<Users className="w-16 h-16 text-amber-400" />
						</div>
						<h2 className="text-4xl font-bold text-white mb-6">
							The Majestic Experience
						</h2>
						<p className="text-xl text-slate-300 max-w-3xl mx-auto">
							Beyond transactions, we create lasting relationships built on trust, expertise, and shared passion for automotive excellence.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								title: "Personal Curator",
								description: "Your dedicated specialist understands your preferences and finds vehicles that match your vision.",
								icon: Crown
							},
							{
								title: "Exclusive Access",
								description: "First access to rare finds, private collections, and vehicles not available to the general market.",
								icon: Star
							},
							{
								title: "Lifetime Support",
								description: "From acquisition to maintenance, our relationship extends far beyond the initial purchase.",
								icon: Shield
							}
						].map((service, index) => (
							<div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
								<div className="flex justify-center mb-6">
									<div className="p-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full group-hover:scale-110 transition-transform duration-300">
										<service.icon className="w-8 h-8 text-white" />
									</div>
								</div>
								<h3 className="text-2xl font-bold text-white mb-4 text-center">{service.title}</h3>
								<p className="text-slate-300 text-center leading-relaxed">{service.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="py-20 bg-gradient-to-r from-amber-50 to-amber-100">
				<div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
					<div className="flex justify-center mb-8">
						<div className="p-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full shadow-2xl">
							<Car className="w-12 h-12 text-amber-400" />
						</div>
					</div>
					<h3 className="text-4xl font-bold text-slate-900 mb-6">
						Begin Your Journey
					</h3>
					<p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
						Discover a world where automotive dreams become reality. Let us help you find not just a car, but your perfect driving companion.
					</p>
					<div className="flex flex-col sm:flex-row gap-6 justify-center">
						<a
							href="/inventory"
							className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
						>
							<Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
							Explore Collection
						</a>
						<a
							href="/contact"
							className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
						>
							<Crown className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
							Speak with a Curator
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}