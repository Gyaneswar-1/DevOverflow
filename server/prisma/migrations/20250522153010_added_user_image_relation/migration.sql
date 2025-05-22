/*
  Warnings:

  - A unique constraint covering the columns `[profileImgId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImgId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profileImgId_key" ON "User"("profileImgId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileImgId_fkey" FOREIGN KEY ("profileImgId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
