-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "clerkUserId" TEXT,
    "stripeCustomerId" TEXT,
    "subscriptionId" TEXT
);
INSERT INTO "new_User" ("clerkUserId", "createdAt", "email", "id", "image", "name", "stripeCustomerId", "subscriptionId", "updatedAt") SELECT "clerkUserId", "createdAt", "email", "id", "image", "name", "stripeCustomerId", "subscriptionId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
CREATE UNIQUE INDEX "User_subscriptionId_key" ON "User"("subscriptionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
