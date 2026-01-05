import { PrismaClient } from "@prisma/client";
import { seedAdmin } from "./admin.seed";
// import { seedTaxonomy } from "./taxonomy.seed";
// import { seedClassifieds } from "./classifieds.seed";
// import { seedImages } from "./images.seed";
// import { seedCustomers } from "./customers.seed";

const prisma = new PrismaClient();

async function main() {
	// await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
	
	// Only seed admin for now due to connection pool limits
	await seedAdmin(prisma);
	
	// Uncomment these one by one if you want to seed more data
	// await seedTaxonomy(prisma);
	// await seedClassifieds(prisma);
	// await seedImages(prisma);
	// await seedCustomers(prisma);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
