"use client";

import { useState } from "react";
import {
  Scanner,
  useDevices,
  IDetectedBarcode,
} from "@yudiel/react-qr-scanner";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransaction } from "@/app/_actions/upsert-transaction";
import TableResults from "./table-results";
import Navbar from "@/app/_components/navbar";
import axios from "axios";
import { Button } from "@/app/_components/ui/button";

type ScannedDataType = {
  commerceName: string;
  amount: number;
  paymentMethod: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  key?: string;
};

const QrCodeScanner = () => {
  const [scannedData, setScannedData] = useState<ScannedDataType>({
    commerceName: "",
    amount: 0,
    paymentMethod: "",
    products: [],
  });
  const useIsScannedDataEmpty = (scannedData: ScannedDataType) => {
    return (
      scannedData.commerceName === "" &&
      scannedData.amount === 0 &&
      scannedData.paymentMethod === "" &&
      scannedData.products.length === 0
    );
  };

  const devices = useDevices();
  const isScannedDataEmpty = useIsScannedDataEmpty(scannedData);

  const resetScannedData = () => {
    setScannedData({
      commerceName: "",
      amount: 0,
      paymentMethod: "",
      products: [],
    });
  };

  const drawFrame = (
    detectedCodes: IDetectedBarcode[],
    ctx: CanvasRenderingContext2D,
  ) => {
    detectedCodes.forEach((code) => {
      const { x, y, width, height } = code.boundingBox;
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    });
  };

  const renderScanner = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="mx-2 mt-16 flex rounded-md p-2 sm:h-[40rem] sm:w-[40rem] sm:flex-row">
          <Scanner
            constraints={{
              facingMode: "environment",
              deviceId: devices[3]?.deviceId,
              frameRate: { ideal: 30, max: 60 },
            }}
            onScan={(result) => {
              if (result[0]?.rawValue) {
                handleScan(result[0].rawValue);
              }
            }}
            components={{ tracker: drawFrame }}
          />
        </div>
      </div>
    );
  };

  const renderTableResults = (data: ScannedDataType) => {
    return (
      <div className="flex flex-col">
        <TableResults scannedData={data} />
        <div className="mb-24 flex justify-end gap-2">
          <Button onClick={handleCancel} variant="destructive">
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Nota Fiscal</Button>
        </div>
      </div>
    );
  };

  const renderScannerAndResults = () => {
    if (isScannedDataEmpty) {
      return renderScanner();
    }
    return renderTableResults(scannedData);
  };

  const handleScan = async (url: string) => {
    try {
      const response = await axios.get(
        "https://nf-api-server.vercel.app/proxy",
        {
          params: { url },
        },
      );
      console.log("Data fetched:", response.data);
      setScannedData(response.data);
      renderTableResults(scannedData);
      // setMessage(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const paymentMethodChecker = (paymentMethod: string) => {
    return paymentMethod.includes("CARTÃO DE CRÉDITO")
      ? TransactionPaymentMethod.CREDIT_CARD
      : TransactionPaymentMethod.PIX;
  };

  const handleCancel = () => {
    resetScannedData();
  };

  const handleSave = async () => {
    if (isScannedDataEmpty) return;
    // Criar verificação para se o ID(kEY DA NOTA FISCAL) já existe
    try {
      upsertTransaction({
        name: scannedData.commerceName,
        amount: scannedData.amount,
        type: TransactionType.EXPENSE,
        category: TransactionCategory.FOOD,
        paymentMethod: paymentMethodChecker(scannedData.paymentMethod),
        id: scannedData.key,
        date: new Date(),
      });
      resetScannedData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <>
      <Navbar />
      {renderScannerAndResults()}
    </>
  );
};

export default QrCodeScanner;
