// db/prisma.ts
import pkg from '@prisma/client';

// Создаём PrismaClient через default export
const prisma = new (pkg as any).PrismaClient();

export default prisma;
