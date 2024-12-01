import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  const isDeposit = transaction.type === TransactionType.DEPOSIT;
  const isExpense = transaction.type === TransactionType.EXPENSE;
  const isInvestment = transaction.type === TransactionType.INVESTMENT;

  if (isDeposit) {
    return (
      <Badge className="bg-green-muted bg-opacity-10 font-bold text-primary hover:bg-green-muted hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (isExpense) {
    return (
      <Badge className="bg-red-muted bg-opacity-10 font-bold text-danger hover:bg-red-muted hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }
  if (isInvestment) {
    return (
      <Badge className="bg-yellow-500 bg-opacity-10 font-bold text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-10">
        <CircleIcon className="mr-2 fill-yellow-500" size={10} />
        Investimento
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
