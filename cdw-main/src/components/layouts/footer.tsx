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
			<SiMeta className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors duration-300" />
		),
	},
	{
		id: 2,
		href: "https://twitter.com",
		icon: (
			<SiX className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors duration-300" />
		),
	},
	{
		id: 3,
		href: "https://instagram.com",
		icon: (
			<SiInstagram className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors duration-300" />
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
		<footer className="bg-gray-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent"></div>
			</div>
			
			<div className="relative">
				{/* Main Footer Content */}
				<div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
						{/* Brand Section */}
						<div className="lg:col-span-1">
							<Link className="flex items-center mb-6" href={routes.home}>
								<Image
									width={300}
									height={100}
									alt="Majestic Motors Logo"
									className="h-10 relative"
									src="/logo.svg"
								/>
							</Link>
							<p className="text-gray-600 mb-6 leading-relaxed">
								Curating extraordinary automotive experiences for the most discerning clientele. 
								Where luxury meets excellence.
							</p>
							<div className="flex items-center mb-4">
								<Crown className="w-5 h-5 text-blue-600 mr-2" />
								<span className="text-blue-600 font-semibold">Premium Automotive Curation</span>
							</div>
							<div className="flex space-x-4">
								{socialLinks.map((link) => (
									<Link 
										href={link.href} 
										key={link.id}
										className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 hover:scale-110 shadow-sm"
									>
										{link.icon}
									</Link>
								))}
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
								<div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
								Quick Links
							</h3>
							<ul className="space-y-3">
								{quickLinks.map((link, index) => (
									<li key={index}>
										<Link
											href={link.href}
											className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group"
										>
											<div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-blue-500 transition-colors duration-300"></div>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Contact Information */}
						<div>
							<h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
								<div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
								Contact Info
							</h3>
							<ul className="space-y-4">
								{contactInfo.map((item, index) => (
									<li key={index}>
										{item.href !== "#" ? (
											<Link
												href={item.href}
												className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-start group"
											>
												<item.icon className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
												<span className="text-sm leading-relaxed">{item.label}</span>
											</Link>
										) : (
											<div className="text-gray-600 flex items-start">
												<item.icon className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
												<span className="text-sm leading-relaxed">{item.label}</span>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>

						{/* Newsletter */}
						<div>
							<NewsletterForm />
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-200">
					<div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
						<div className="text-center">
							<div className="mb-4">
								<h4 className="text-lg font-bold text-blue-600 mb-2">Company Info</h4>
								<p className="text-gray-500 text-sm">Company No. 123456789 | VAT No. GB123456789</p>
								<p className="text-gray-400 text-xs mt-2">
									Majestic Motors is not authorised and not regulated by the Financial Conduct Authority
								</p>
							</div>
							<div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100">
								<p className="text-gray-500 text-sm">
									© {new Date().getFullYear()} Majestic Motors. All rights reserved.
								</p>
								<div className="flex space-x-6 mt-4 sm:mt-0">
									<Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
										Privacy Policy
									</Link>
									<Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
										Terms of Service
									</Link>
									<Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-300">
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
