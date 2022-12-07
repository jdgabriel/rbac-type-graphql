import { PrismaClient } from "@prisma/client";

// TODO Add database configuration external by default environments folder
export const prisma = new PrismaClient();
