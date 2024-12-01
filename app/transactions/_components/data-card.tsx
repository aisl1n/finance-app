import { Transaction } from "@prisma/client";

interface DataCardProps {
  data: Transaction[];
}

const DataCard = ({ data }: DataCardProps) => {
  console.log("Estou aqui no meu cardinzinho");
  console.log(data);
  return (
    <div>
      <h1>Card</h1>
    </div>
  );
};

export default DataCard;
