import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      name: true,
      type: true,
      amount: true,
      category: true,
      paymentMethod: true,
      date: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          quantity: true,
        },
      },
    },
  });

  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    products: transaction.products.map((product) => ({
      ...product,
      price: Number(product.price),
    })),
  }));

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Gastos</h1>
          <AddTransactionButton />
        </div>
        <div className="block md:hidden">
          <DataCard data={formattedTransactions} />
        </div>
        <div className="hidden md:block">
          <DataTable columns={transactionColumns} data={transactions} />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
