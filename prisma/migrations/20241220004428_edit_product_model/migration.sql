/*
  Warnings:

  - You are about to drop the `_TransactionProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionProducts" DROP CONSTRAINT "_TransactionProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionProducts" DROP CONSTRAINT "_TransactionProducts_B_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "transactionId" DROP NOT NULL;

-- DropTable
DROP TABLE "_TransactionProducts";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
