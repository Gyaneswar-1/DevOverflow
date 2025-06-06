-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "questionId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "uidID" TEXT NOT NULL,
    "questionID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Votes_uidID_questionID_key" ON "Votes"("uidID", "questionID");

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_uidID_fkey" FOREIGN KEY ("uidID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
