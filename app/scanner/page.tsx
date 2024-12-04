import { auth } from "@clerk/nextjs/server";
import QrCodeScanner from "./_components/qr-code-scanner";
import { redirect } from "next/navigation";

const ScannerPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return <QrCodeScanner />;
};

export default ScannerPage;
