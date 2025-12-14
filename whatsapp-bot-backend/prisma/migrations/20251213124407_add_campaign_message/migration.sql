/*
  Warnings:

  - You are about to drop the column `convertedCount` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `repliedCount` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `message` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "convertedCount",
DROP COLUMN "repliedCount",
DROP COLUMN "updatedAt",
ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';
