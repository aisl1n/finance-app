import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Navbar from "@/app/_components/navbar";

interface ScannedData {
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  amount: number;
  nomeLoja?: string;
  dataCompra?: string;
}

interface TableResultsProps {
  scannedData: ScannedData;
}

export default function TableResults({
  scannedData: { products, amount },
}: TableResultsProps) {
  return (
    <>
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
              {products.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-start">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right font-bold">
                  R${amount}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      <Navbar />
    </>
  );
}
