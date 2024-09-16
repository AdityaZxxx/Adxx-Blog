import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Hapus data dari semua koleksi yang diinginkan
    await prisma.comment.deleteMany({});
    // Tambahkan perintah serupa untuk koleksi lain jika ada
    // await prisma.otherModel.deleteMany({});

    console.log("Database reset successfully.");
  } catch (err) {
    console.error("Error resetting database:", err);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
