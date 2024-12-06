import { auth } from "@clerk/nextjs/server";
import QrCodeScanner from "./_components/qr-code-scanner";
import { redirect } from "next/navigation";
import AddTransactionButton from "../_components/add-transaction-button";

const ScannerPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Scanner</h1>
        <AddTransactionButton />
      </div>
      <QrCodeScanner />
    </div>
  );
};

export default ScannerPage;
