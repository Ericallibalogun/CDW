import { PrismaClient, ClassifiedStatus, Colour, FuelType, Transmission, BodyType, ULEZCompliance, OdoUnit, CurrencyCode } from "@prisma/client";

export async function seedPremiumVehicles(prisma: PrismaClient) {
	console.log("🚗 Seeding premium vehicles...");

	// First, ensure we have the required makes
	const makes = await Promise.all([
		prisma.make.upsert({
			where: { name: "Mercedes-Benz" },
			update: {},
			create: { name: "Mercedes-Benz", image: "/images/brands/mercedes.png" }
		}),
		prisma.make.upsert({
			where: { name: "Porsche" },
			update: {},
			create: { name: "Porsche", image: "/images/brands/porsche.png" }
		}),
		prisma.make.upsert({
			where: { name: "BMW" },
			update: {},
			create: { name: "BMW", image: "/images/brands/bmw.png" }
		}),
		prisma.make.upsert({
			where: { name: "Audi" },
			update: {},
			create: { name: "Audi", image: "/images/brands/audi.png" }
		}),
		prisma.make.upsert({
			where: { name: "Lamborghini" },
			update: {},
			create: { name: "Lamborghini", image: "/images/brands/lamborghini.png" }
		}),
		prisma.make.upsert({
			where: { name: "Ferrari" },
			update: {},
			create: { name: "Ferrari", image: "/images/brands/ferrari.png" }
		})
	]);

	// Create models
	const models = await Promise.all([
		prisma.model.upsert({
			where: { makeId_name: { makeId: makes[0].id, name: "AMG GT" } },
			update: {},
			create: { name: "AMG GT", makeId: makes[0].id }
		}),
		prisma.model.upsert({
			where: { makeId_name: { makeId: makes[1].id, name: "911" } },
			update: {},
			create: { name: "911", makeId: makes[1].id }
		}),
		prisma.model.upsert({
			where: { makeId_name: { makeId: makes[2].id, name: "M8" } },
			update: {},
			create: { name: "M8", makeId: makes[2].id }
		}),
		prisma.model.upsert({
			where: { makeId_name: { makeId: makes[3].id, name: "RS7" } },
			update: {},
			create: { name: "RS7", makeId: makes[3].id }
		}),
		prisma.model.upsert({
			where: { makeId_name: { makeId: makes[4].id, name: "Huracán" } },
			update: {},
			create: { name: "Huracán", makeId: makes[4].id }
		}),
		prisma.model.upsert({
			where: { makeId_name: { makeId: makes[5].id, name: "F8" } },
			update: {},
			create: { name: "F8", makeId: makes[5].id }
		})
	]);

	// Create model variants
	const modelVariants = await Promise.all([
		prisma.modelVariant.upsert({
			where: { modelId_name: { modelId: models[0].id, name: "63 S Coupe" } },
			update: {},
			create: { name: "63 S Coupe", modelId: models[0].id, yearStart: 2020, yearEnd: 2024 }
		}),
		prisma.modelVariant.upsert({
			where: { modelId_name: { modelId: models[1].id, name: "Turbo S" } },
			update: {},
			create: { name: "Turbo S", modelId: models[1].id, yearStart: 2020, yearEnd: 2024 }
		}),
		prisma.modelVariant.upsert({
			where: { modelId_name: { modelId: models[2].id, name: "Competition Gran Coupe" } },
			update: {},
			create: { name: "Competition Gran Coupe", modelId: models[2].id, yearStart: 2020, yearEnd: 2024 }
		}),
		prisma.modelVariant.upsert({
			where: { modelId_name: { modelId: models[3].id, name: "Sportback" } },
			update: {},
			create: { name: "Sportback", modelId: models[3].id, yearStart: 2020, yearEnd: 2024 }
		}),
		prisma.modelVariant.upsert({
			where: { modelId_name: { modelId: models[4].id, name: "EVO" } },
			update: {},
			create: { name: "EVO", modelId: models[4].id, yearStart: 2020, yearEnd: 2024 }
		}),
		prisma.modelVariant.upsert({
			where: { modelId_name: { modelId: models[5].id, name: "Tributo" } },
			update: {},
			create: { name: "Tributo", modelId: models[5].id, yearStart: 2020, yearEnd: 2024 }
		})
	]);

	// Create premium vehicles
	const premiumVehicles = [
		{
			slug: "2023-mercedes-amg-gt63s-coupe",
			vrm: "AM23 GTR",
			title: "2023 Mercedes-AMG GT 63 S Coupe",
			description: "Exceptional performance meets luxury in this stunning AMG GT 63 S. Features include premium leather interior, carbon fiber accents, and the legendary AMG 4.0L V8 biturbo engine delivering 630hp.",
			year: 2023,
			odoReading: 2500,
			doors: 2,
			seats: 4,
			price: 185000,
			makeId: makes[0].id,
			modelId: models[0].id,
			modelVariantId: modelVariants[0].id,
			ulezCompliance: ULEZCompliance.EXEMPT,
			transmission: Transmission.AUTOMATIC,
			colour: Colour.BLACK,
			fuelType: FuelType.PETROL,
			bodyType: BodyType.COUPE,
			odoUnit: OdoUnit.MILES,
			currency: CurrencyCode.GBP,
			status: ClassifiedStatus.LIVE,
			image: {
				alt: "2023 Mercedes-AMG GT 63 S Coupe",
				src: "/images/hero/AdobeStock_197763326.jpeg",
				blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
				isMain: true
			}
		},
		{
			slug: "2024-porsche-911-turbo-s",
			vrm: "P24 TBS",
			title: "2024 Porsche 911 Turbo S",
			description: "The pinnacle of 911 performance. This Turbo S delivers 640hp through its twin-turbo flat-six engine, featuring Sport Chrono Package, ceramic brakes, and exclusive interior appointments.",
			year: 2024,
			odoReading: 1200,
			doors: 2,
			seats: 4,
			price: 220000,
			makeId: makes[1].id,
			modelId: models[1].id,
			modelVariantId: modelVariants[1].id,
			ulezCompliance: ULEZCompliance.EXEMPT,
			transmission: Transmission.AUTOMATIC,
			colour: Colour.SILVER,
			fuelType: FuelType.PETROL,
			bodyType: BodyType.COUPE,
			odoUnit: OdoUnit.MILES,
			currency: CurrencyCode.GBP,
			status: ClassifiedStatus.LIVE,
			image: {
				alt: "2024 Porsche 911 Turbo S",
				src: "/images/hero/AdobeStock_549957876.jpeg",
				blurhash: "L6Pj0^jE.AyE_3t7t7R**0o#DgR4",
				isMain: true
			}
		},
		{
			slug: "2023-bmw-m8-competition-gran-coupe",
			vrm: "BM23 M8C",
			title: "2023 BMW M8 Competition Gran Coupe",
			description: "Ultimate luxury performance sedan with 617hp twin-turbo V8, M xDrive all-wheel drive, and Competition Package. Features Merino leather, carbon fiber trim, and advanced driver assistance.",
			year: 2023,
			odoReading: 3800,
			doors: 4,
			seats: 5,
			price: 165000,
			makeId: makes[2].id,
			modelId: models[2].id,
			modelVariantId: modelVariants[2].id,
			ulezCompliance: ULEZCompliance.EXEMPT,
			transmission: Transmission.AUTOMATIC,
			colour: Colour.BLUE,
			fuelType: FuelType.PETROL,
			bodyType: BodyType.SEDAN,
			odoUnit: OdoUnit.MILES,
			currency: CurrencyCode.GBP,
			status: ClassifiedStatus.LIVE,
			image: {
				alt: "2023 BMW M8 Competition Gran Coupe",
				src: "/images/hero/AdobeStock_581272875.jpeg",
				blurhash: "L5PZt=WB2yk8pyo0adR*.7kVs:R4",
				isMain: true
			}
		},
		{
			slug: "2024-audi-rs7-sportback",
			vrm: "AU24 RS7",
			title: "2024 Audi RS7 Sportback",
			description: "Sophisticated performance with 591hp twin-turbo V8, quattro all-wheel drive, and dynamic ride control. Premium Plus package includes Bang & Olufsen sound and executive rear seating.",
			year: 2024,
			odoReading: 800,
			doors: 4,
			seats: 5,
			price: 145000,
			makeId: makes[3].id,
			modelId: models[3].id,
			modelVariantId: modelVariants[3].id,
			ulezCompliance: ULEZCompliance.EXEMPT,
			transmission: Transmission.AUTOMATIC,
			colour: Colour.WHITE,
			fuelType: FuelType.PETROL,
			bodyType: BodyType.HATCHBACK,
			odoUnit: OdoUnit.MILES,
			currency: CurrencyCode.GBP,
			status: ClassifiedStatus.LIVE,
			image: {
				alt: "2024 Audi RS7 Sportback",
				src: "/images/hero/AdobeStock_598537974.jpeg",
				blurhash: "L7R:8?WB2yk8pyo0adR*.7kVs:R4",
				isMain: true
			}
		},
		{
			slug: "2023-lamborghini-huracan-evo",
			vrm: "LB23 EVO",
			title: "2023 Lamborghini Huracán EVO",
			description: "Pure Italian supercar excellence with 631hp naturally aspirated V10, rear-wheel drive precision, and track-focused aerodynamics. Features Alcantara interior and carbon fiber package.",
			year: 2023,
			odoReading: 1500,
			doors: 2,
			seats: 2,
			price: 285000,
			makeId: makes[4].id,
			modelId: models[4].id,
			modelVariantId: modelVariants[4].id,
			ulezCompliance: ULEZCompliance.EXEMPT,
			transmission: Transmission.AUTOMATIC,
			colour: Colour.YELLOW,
			fuelType: FuelType.PETROL,
			bodyType: BodyType.COUPE,
			odoUnit: OdoUnit.MILES,
			currency: CurrencyCode.GBP,
			status: ClassifiedStatus.LIVE,
			image: {
				alt: "2023 Lamborghini Huracán EVO",
				src: "/images/hero/AdobeStock_609400653.jpeg",
				blurhash: "L8R:8?WB2yk8pyo0adR*.7kVs:R4",
				isMain: true
			}
		},
		{
			slug: "2024-ferrari-f8-tributo",
			vrm: "FR24 F8T",
			title: "2024 Ferrari F8 Tributo",
			description: "The ultimate expression of Ferrari's mid-engine V8 heritage. 710hp twin-turbo V8, advanced aerodynamics, and race-derived technology. Finished in Rosso Corsa with premium leather interior.",
			year: 2024,
			odoReading: 600,
			doors: 2,
			seats: 2,
			price: 325000,
			makeId: makes[5].id,
			modelId: models[5].id,
			modelVariantId: modelVariants[5].id,
			ulezCompliance: ULEZCompliance.EXEMPT,
			transmission: Transmission.AUTOMATIC,
			colour: Colour.RED,
			fuelType: FuelType.PETROL,
			bodyType: BodyType.COUPE,
			odoUnit: OdoUnit.MILES,
			currency: CurrencyCode.GBP,
			status: ClassifiedStatus.LIVE,
			image: {
				alt: "2024 Ferrari F8 Tributo",
				src: "/images/hero/AdobeStock_753683117.jpeg",
				blurhash: "L9R:8?WB2yk8pyo0adR*.7kVs:R4",
				isMain: true
			}
		}
	];

	// Create classifieds and their images
	for (const vehicle of premiumVehicles) {
		const { image, ...vehicleData } = vehicle;
		
		const classified = await prisma.classified.upsert({
			where: { slug: vehicle.slug },
			update: vehicleData,
			create: vehicleData
		});

		await prisma.image.create({
			data: {
				...image,
				classifiedId: classified.id
			}
		});
	}

	console.log("✅ Premium vehicles seeded successfully!");
}