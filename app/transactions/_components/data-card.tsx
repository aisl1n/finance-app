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
import TransactionTypeBadge from "./type-badge";
import EditTransactionButton from "./edit-transaction-button";
import DeleteTransactionButton from "./delete-transaction-button";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Transaction {
  id: string;
  name: string;
  type: TransactionType;
  amount: Decimal;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  products: Product[]; // Adicione esta linha
}

interface DataCardInterface {
  data: Transaction[];
}

const DataCard = ({ data }: DataCardInterface) => {
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <span>Ver detalhes</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Resumo da Compra</DialogTitle>
                  <DialogDescription>{transaction.name}</DialogDescription>
                </DialogHeader>
                <div className="w-full pb-4">
                  <div className="shadow-md">
                    <h1 className="flex flex-col pb-2 text-center font-black">
                      Nota Fiscal
                    </h1>
                    <Table className="rounded border">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead className="text-start">Qtd/KG</TableHead>
                          <TableHead className="text-right">Preço/R$</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transaction.products.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-start">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell className="text-right font-bold">
                            R${transaction.amount.toString()}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Sair</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DataCard;
