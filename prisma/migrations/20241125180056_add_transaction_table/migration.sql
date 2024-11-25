-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN "emoji" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "subCategoryId" INTEGER,
    "emoji" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
