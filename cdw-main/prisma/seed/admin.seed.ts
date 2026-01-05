import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedAdmin(prisma: PrismaClient) {
	try {
		// Check if admin already exists
		const existingAdmin = await prisma.user.findUnique({
			where: { email: "allieric28@gmail.com" }
		});

		if (existingAdmin) {
			console.log("Admin already exists:", existingAdmin.email);
			return existingAdmin;
		}

		const password = await bcrypt.hash("abc123#", 10);

		const admin = await prisma.user.create({
			data: {
				email: "allieric28@gmail.com",
				hashedPassword: password,
			},
		});

		console.log("Admin created: ", admin.email);
		return admin;
	} catch (error) {
		console.error("Error creating admin:", error);
		throw error;
	}
}
