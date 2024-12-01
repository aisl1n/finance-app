"use client";

import { Button } from "../_components/ui/button";
import { useState } from "react";
import {
  Scanner,
  useDevices,
  IDetectedBarcode,
} from "@yudiel/react-qr-scanner";

import axios from "axios";
import TableResults from "./_components/TableResults";
import Navbar from "../_components/navbar";
import { upsertTransaction } from "../_actions/upsert-transaction";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

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

const useIsScannedDataEmpty = (scannedData: ScannedDataType) => {
  return (
    scannedData.commerceName === "" &&
    scannedData.amount === 0 &&
    scannedData.paymentMethod === "" &&
    scannedData.products.length === 0
  );
};

const ScannerQrcode = () => {
  const [scannedData, setScannedData] = useState<ScannedDataType>({
    commerceName: "",
    amount: 0,
    paymentMethod: "",
    products: [],
  });
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
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    });
  };

  const handleScan = async (url: string) => {
    try {
      const response = await axios.get("https://nf-api-server.vercel.app/proxy", {
        params: { url },
      });
      console.log("Data fetched:", response.data);
      setScannedData(response.data);
      // setMessage(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        paymentMethod: scannedData.paymentMethod.includes("CARTÃO DE CRÉDITO")
          ? TransactionPaymentMethod.CREDIT_CARD
          : TransactionPaymentMethod.PIX,
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
      {isScannedDataEmpty ? (
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
      ) : (
        <div>
          {/* <RenderMessage setMessage={setMessage} message={message} /> */}
          <div className="pb-20">
            <TableResults scannedData={scannedData} />
            <div className="flex flex-row justify-end gap-2 p-4">
              <Button
                className="bg-rose-600 font-bold text-inherit hover:bg-rose-800"
                onClick={() => handleCancel()}
              >
                Cancelar
              </Button>
              <Button
                className="bg-emerald-500 font-bold text-inherit hover:bg-emerald-800"
                onClick={() => handleSave()}
              >
                Salvar compra
              </Button>
            </div>
          </div>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default ScannerQrcode;
