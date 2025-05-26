/*
  Warnings:

  - You are about to drop the column `count` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "count",
DROP COLUMN "dislikes",
DROP COLUMN "likes",
ADD COLUMN     "downvote" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvote" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "count",
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;
