/*
  Warnings:

  - You are about to drop the `Domain` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `domainId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_domainId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "domainId" SET NOT NULL;

-- DropTable
DROP TABLE "Domain";
