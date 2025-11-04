import { PrismaClient } from "@prisma/client";
import { server } from "../src/server";

// Create one Prisma client instance
const prisma = new PrismaClient();

// Gracefully close Prisma + Express after all tests
afterAll(async () => {
  await prisma.$disconnect();
  server.close(); // shuts down Express to avoid open handles
});
