-- CreateTable
CREATE TABLE "_TransactionProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionProducts_AB_unique" ON "_TransactionProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionProducts_B_index" ON "_TransactionProducts"("B");

-- AddForeignKey
ALTER TABLE "_TransactionProducts" ADD CONSTRAINT "_TransactionProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionProducts" ADD CONSTRAINT "_TransactionProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
