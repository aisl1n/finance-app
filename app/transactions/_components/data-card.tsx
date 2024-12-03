"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/trasactions";
import { Transaction } from "@prisma/client";
import TransactionTypeBadge from "./type-badge";
import EditTransactionButton from "./edit-transaction-button";
import DeleteTransactionButton from "./delete-transaction-button";
import { Button } from "@/app/_components/ui/button";

interface DataCardProps {
  data: Transaction[];
}

const DataCard = ({ data }: DataCardProps) => {
  return (
    <div className="pb-24">
      {data.map((transaction) => (
        <Card key={transaction.id} className="mb-4 w-full">
          <div className="flex justify-between px-4 py-2">
            <EditTransactionButton transaction={transaction} />
            <DeleteTransactionButton transactionId={transaction.id} />
          </div>
          <CardHeader className="px-6 pb-4">
            <CardTitle className="text-center text-sm font-black uppercase tracking-wider">
              {transaction.name}
            </CardTitle>
            <CardDescription className="flex justify-between">
              <div className="flex flex-col justify-center text-xs font-light">
                {TRANSACTION_CATEGORY_LABELS[transaction.category]}
              </div>
              <TransactionTypeBadge transaction={transaction} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between py-4 text-sm font-bold">
              <div className="flex justify-between">
                <span>
                  {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
                </span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(transaction.amount))}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Data</span>
                <span>
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <span>Ver detalhes</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DataCard;
