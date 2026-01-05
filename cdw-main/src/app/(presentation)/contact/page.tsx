import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send, Crown, Star, Shield } from "lucide-react";

export const metadata: Metadata = {
	title: "Contact Us | Majestic Motors",
	description: "Get in touch with Majestic Motors. We're here to help you find your perfect luxury vehicle.",
};

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
				</div>
				
				<div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-24">
					<div className="text-center">
						<div className="flex justify-center mb-6">
							<div className="p-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-xl">
								<Crown className="w-10 h-10 text-white" />
							</div>
						</div>
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
							Contact Our Curators
						</h1>
						<p className="mt-6 text-xl leading-8 text-slate-200 max-w-3xl mx-auto">
							Ready to discover your perfect luxury vehicle? Our automotive specialists are here to provide 
							personalized service and expert guidance throughout your journey.
						</p>
					</div>
				</div>
			</div>

			{/* Contact Information Cards */}
			<div className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: Phone,
								title: "Call Us",
								content: "+1 (555) 123-4567",
								subtitle: "Speak with a specialist",
								href: "tel:+15551234567"
							},
							{
								icon: Mail,
								title: "Email Us",
								content: "curators@majesticmotors.com",
								subtitle: "Get expert advice",
								href: "mailto:curators@majesticmotors.com"
							},
							{
								icon: MapPin,
								title: "Visit Our Showroom",
								content: "123 Luxury Boulevard",
								subtitle: "Premium District, City 12345",
								href: "#"
							},
							{
								icon: Clock,
								title: "Business Hours",
								content: "Mon-Fri: 9AM-7PM",
								subtitle: "Sat-Sun: 10AM-6PM",
								href: "#"
							}
						].map((item, index) => (
							<div key={index} className="group relative bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
								<div className="flex justify-center mb-4">
									<div className="p-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl group-hover:from-amber-400 group-hover:to-amber-600 transition-all duration-300">
										<item.icon className="w-6 h-6 text-amber-400 group-hover:text-white" />
									</div>
								</div>
								<h3 className="text-lg font-bold text-slate-900 text-center mb-2">{item.title}</h3>
								{item.href !== "#" ? (
									<a href={item.href} className="block text-center group-hover:text-amber-600 transition-colors duration-300">
										<p className="font-semibold text-slate-800">{item.content}</p>
										<p className="text-sm text-slate-600 mt-1">{item.subtitle}</p>
									</a>
								) : (
									<div className="text-center">
										<p className="font-semibold text-slate-800">{item.content}</p>
										<p className="text-sm text-slate-600 mt-1">{item.subtitle}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="py-20 bg-gradient-to-r from-slate-50 to-white">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
						{/* Contact Form */}
						<div className="relative">
							<div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-20"></div>
							<div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
								<div className="flex items-center mb-6">
									<Send className="w-7 h-7 text-amber-500 mr-3" />
									<h2 className="text-3xl font-bold text-slate-900">
										Send us a Message
									</h2>
								</div>
								
								<form className="space-y-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">
												First Name *
											</label>
											<input
												type="text"
												id="firstName"
												name="firstName"
												className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
												required
											/>
										</div>
										<div>
											<label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
												Last Name *
											</label>
											<input
												type="text"
												id="lastName"
												name="lastName"
												className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
												required
											/>
										</div>
									</div>

									<div>
										<label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
											Email Address *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
											required
										/>
									</div>

									<div>
										<label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
											Phone Number
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
										/>
									</div>

									<div>
										<label htmlFor="interest" className="block text-sm font-semibold text-slate-700 mb-2">
											I'm interested in
										</label>
										<select
											id="interest"
											name="interest"
											className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
										>
											<option value="">Select your interest</option>
											<option value="buying">Buying a luxury vehicle</option>
											<option value="selling">Selling my current vehicle</option>
											<option value="financing">Financing options</option>
											<option value="service">Service and maintenance</option>
											<option value="consultation">Personal consultation</option>
											<option value="other">Other</option>
										</select>
									</div>

									<div>
										<label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
											Message *
										</label>
										<textarea
											id="message"
											name="message"
											rows={5}
											className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 resize-none"
											placeholder="Tell us about your automotive needs and preferences..."
											required
										></textarea>
									</div>

									<button
										type="submit"
										className="w-full group inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
									>
										<Send className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
										Send Message
									</button>
								</form>
							</div>
						</div>

						{/* Why Choose Us */}
						<div className="space-y-8">
							<div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-2xl text-white shadow-2xl">
								<div className="flex items-center mb-6">
									<Star className="w-8 h-8 text-amber-400 mr-3" />
									<h2 className="text-2xl font-bold">
										Why Choose Majestic Motors?
									</h2>
								</div>
								<div className="space-y-4">
									{[
										"Personalized service from automotive specialists",
										"Exclusive access to rare and limited edition vehicles",
										"Comprehensive vehicle history and documentation",
										"White-glove delivery and concierge services",
										"Lifetime relationship and ongoing support",
										"Investment-grade vehicle authentication"
									].map((feature, index) => (
										<div key={index} className="flex items-start group">
											<div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
											<span className="text-slate-200 group-hover:text-white transition-colors duration-300">{feature}</span>
										</div>
									))}
								</div>
							</div>

							{/* Service Promise */}
							<div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
								<div className="flex items-center mb-6">
									<Shield className="w-8 h-8 text-amber-500 mr-3" />
									<h3 className="text-2xl font-bold text-slate-900">
										Our Service Promise
									</h3>
								</div>
								<p className="text-slate-600 leading-relaxed mb-6">
									At Majestic Motors, we understand that acquiring a luxury vehicle is more than a transaction—it's 
									the beginning of a relationship. Our team of certified automotive specialists is committed to 
									providing you with unparalleled service, expert guidance, and ongoing support.
								</p>
								<div className="flex items-center text-amber-600 font-semibold">
									<Crown className="w-5 h-5 mr-2" />
									<span>Excellence in Every Detail</span>
								</div>
							</div>

							{/* Quick Response */}
							<div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200">
								<div className="text-center">
									<Clock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
									<h4 className="text-lg font-bold text-slate-900 mb-2">
										Quick Response Guarantee
									</h4>
									<p className="text-slate-700">
										We respond to all inquiries within 2 hours during business hours. 
										For urgent matters, call us directly.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}