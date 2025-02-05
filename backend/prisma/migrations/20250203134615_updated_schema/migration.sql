-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "domainId" INTEGER;

-- CreateTable
CREATE TABLE "Domain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
