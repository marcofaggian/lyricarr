import * as client from "@prisma/client";
export type * from "@prisma/client";
export default client;
export const prisma = new client.PrismaClient();
