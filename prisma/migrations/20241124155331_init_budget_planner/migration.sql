-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "clerkUserId" TEXT,
    "stripeCustomerId" TEXT,
    "subscriptionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "stripeSubscription" TEXT NOT NULL PRIMARY KEY,
    "interval" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "currentPeriodStart" INTEGER NOT NULL,
    "currentPeriodEnd" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL DEFAULT 0.0,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_subscriptionId_key" ON "User"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscription_key" ON "Subscription"("stripeSubscription");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_userId_key" ON "Category"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_categoryId_key" ON "SubCategory"("name", "categoryId");
