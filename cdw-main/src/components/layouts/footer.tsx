import { navLinks } from "@/config/constants";
import { routes } from "@/config/routes";
import { SiInstagram, SiMeta, SiX } from "@icons-pack/react-simple-icons";
import { Crown, Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "../shared/newsletter-form";

const socialLinks = [
	{
		id: 1,
		href: "https://facebook.com",
		icon: (
			<SiMeta className="w-5 h-5 text-brand-navy-400 hover:text-brand-navy-600 transition-colors duration-300" />
		),
	},
	{
		id: 2,
		href: "https://twitter.com",
		icon: (
			<SiX className="w-5 h-5 text-brand-navy-400 hover:text-brand-navy-600 transition-colors duration-300" />
		),
	},
	{
		id: 3,
		href: "https://instagram.com",
		icon: (
			<SiInstagram className="w-5 h-5 text-brand-navy-400 hover:text-brand-navy-600 transition-colors duration-300" />
		),
	},
];

const quickLinks = [
	{ label: "Browse Cars", href: routes.inventory },
	{ label: "About Us", href: routes.about },
	{ label: "Contact", href: routes.contact },
	{ label: "Admin", href: routes.signIn },
];

const contactInfo = [
	{
		icon: Phone,
		label: "+1 (555) 123-4567",
		href: "tel:+15551234567"
	},
	{
		icon: Mail,
		label: "curators@majesticmotors.com",
		href: "mailto:curators@majesticmotors.com"
	},
	{
		icon: MapPin,
		label: "123 Luxury Boulevard, Premium District",
		href: "#"
	},
	{
		icon: Clock,
		label: "Mon-Fri: 9AM-7PM | Sat-Sun: 10AM-6PM",
		href: "#"
	}
];

export const PublicFooter = () => {
	return (
		<footer className="relative overflow-hidden">
			{/* Modern Background */}
			<div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-800 to-brand-navy-700"></div>
			<div className="absolute inset-0 bg-gradient-to-br from-brand-navy-900/40 via-transparent to-brand-red-900/20"></div>
			
			{/* Floating Elements */}
			<div className="absolute top-20 left-20 w-40 h-40 bg-brand-navy-400/10 rounded-full blur-2xl floating-element"></div>
			<div className="absolute bottom-20 right-20 w-32 h-32 bg-brand-red-400/10 rounded-full blur-2xl floating-element" style={{animationDelay: '2s'}}></div>
			
			<div className="relative z-10">
				{/* Main Footer Content */}
				<div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
						{/* Brand Section */}
						<div className="lg:col-span-1">
							<div className="premium-card p-6 mb-8">
								<Link className="flex items-center mb-6" href={routes.home}>
									<Image
										width={192}
										height={64}
										alt="Majestic Motors Logo"
										className="h-12 w-auto object-contain drop-shadow-lg"
										src="/mide_logo-removebg-preview.png"
									/>
								</Link>
								<p className="text-white/80 mb-6 leading-relaxed">
									Curating extraordinary automotive experiences for the most discerning clientele. 
									Where luxury meets excellence.
								</p>
								<div className="flex items-center mb-6">
									<Crown className="w-5 h-5 text-brand-navy-400 mr-3" />
									<span className="text-brand-navy-300 font-semibold">Premium Automotive Curation</span>
								</div>
								<div className="flex space-x-4">
									{socialLinks.map((link) => (
										<Link 
											href={link.href} 
											key={link.id}
											className="p-3 glass rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
										>
											{link.icon}
										</Link>
									))}
								</div>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<div className="premium-card p-6">
								<h3 className="text-xl font-bold text-white mb-6 flex items-center">
									<div className="w-1 h-6 bg-gradient-to-b from-brand-navy-400 to-brand-navy-500 rounded-full mr-3"></div>
									Quick Links
								</h3>
								<ul className="space-y-4">
									{quickLinks.map((link, index) => (
										<li key={index}>
											<Link
												href={link.href}
												className="text-white/70 hover:text-brand-navy-300 transition-colors duration-300 flex items-center group"
											>
												<div className="w-2 h-2 bg-white/30 rounded-full mr-4 group-hover:bg-brand-navy-400 transition-colors duration-300"></div>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Contact Information */}
						<div>
							<div className="premium-card p-6">
								<h3 className="text-xl font-bold text-white mb-6 flex items-center">
									<div className="w-1 h-6 bg-gradient-to-b from-brand-navy-400 to-brand-navy-500 rounded-full mr-3"></div>
									Contact Info
								</h3>
								<ul className="space-y-5">
									{contactInfo.map((item, index) => (
										<li key={index}>
											{item.href !== "#" ? (
												<Link
													href={item.href}
													className="text-white/70 hover:text-brand-navy-300 transition-colors duration-300 flex items-start group"
												>
													<item.icon className="w-5 h-5 text-brand-navy-400 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
													<span className="text-sm leading-relaxed">{item.label}</span>
												</Link>
											) : (
												<div className="text-white/70 flex items-start">
													<item.icon className="w-5 h-5 text-brand-navy-400 mr-4 mt-0.5 flex-shrink-0" />
													<span className="text-sm leading-relaxed">{item.label}</span>
												</div>
											)}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Newsletter */}
						<div>
							<div className="premium-card p-6">
								<NewsletterForm />
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-white/10 backdrop-blur-sm">
					<div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
						<div className="text-center">
							<div className="premium-card p-8 mb-6">
								<h4 className="text-lg font-bold text-brand-navy-300 mb-3">Company Info</h4>
								<p className="text-white/60 text-sm mb-2">Company No. 123456789 | VAT No. GB123456789</p>
								<p className="text-white/40 text-xs">
									Majestic Motors is not authorised and not regulated by the Financial Conduct Authority
								</p>
							</div>
							<div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10">
								<p className="text-white/60 text-sm">
									© {new Date().getFullYear()} Majestic Motors. All rights reserved.
								</p>
								<div className="flex space-x-8 mt-4 sm:mt-0">
									<Link href="#" className="text-white/60 hover:text-brand-navy-300 text-sm transition-colors duration-300">
										Privacy Policy
									</Link>
									<Link href="#" className="text-white/60 hover:text-brand-navy-300 text-sm transition-colors duration-300">
										Terms of Service
									</Link>
									<Link href="#" className="text-white/60 hover:text-brand-navy-300 text-sm transition-colors duration-300">
										Cookie Policy
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
