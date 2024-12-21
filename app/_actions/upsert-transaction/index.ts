"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";


interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  products: Product[];
}

export const insertTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }
  await db.transaction.create({
    data: {
      ...params,
      userId,
      products: {
        create: params.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        })),
      },
    },
  });
  revalidatePath("/transactions");
};

export const updateTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }
  await db.transaction.update({
    data: {
      ...params,
      products: {
        set: params.products.map((product) => ({ id: product.id })),
      },
    },
    where: {
      id: params.id,
    },
  });
  revalidatePath("/transactions");
};

export const upsertTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }
  await db.transaction.upsert({
    update: {
      ...params,
      userId,
      products: {
        set: params.products.map((product) => ({ id: product.id })),
      },
    },
    create: {
      ...params,
      userId,
      products: {
        create: params.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        })),
      },
    },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
