"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { wagmiContractConfig } from "./Contract";
import toast from "react-hot-toast";

export default function Home() {
  const {
    data: count,
    error,
    isPending,
    refetch,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCount",
    args: [],
  });

  const { writeContract, data: txHash, isPending: writePending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Transaction successful!");
    }
  }, [isSuccess, refetch]);

  const handleCounter = async (action: "increase" | "decrease" | "reset") => {
    try {
      await writeContract({
        ...wagmiContractConfig,
        functionName:
          action === "increase"
            ? "increaseByOne"
            : action === "decrease"
            ? "decreaseByOne"
            : "resetCount",
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed!");
    }
  };

  return (
    <div className="bg-primary h-screen grid font-[family-name:var(--font-geist-sans)] overflow-y-hidden">
      <div className="px-[15em] py-[2em]">
        <div className="w-full backdrop-blur-xl flex justify-between border-[1px] border-white p-4 rounded-lg items-center bg-gray-700">
          <h3 className="text-black text-2xl font-bold">💳 Uka's Counter</h3>
          <ConnectButton label="Sign in" />
        </div>
        <div className="min-w-2xl flex justify-center items-center">
          <div className="flex flex-col gap-5 backdrop-blur-xl border-[1px] border-white rounded-lg mt-[10em] p-[2em] justify-center items-center">
            <h4 className="text-black text-2xl">Current count is:</h4>
            <h1 className="text-black text-[5em]">{count}</h1>
            <div className="flex gap-5">
              {(["increase", "decrease", "reset"] as const).map((action) => (
                <button
                  key={action}
                  className={`${(writePending || isConfirming) ? 'bg-gray-300 cursor-not-allowed' : action === "increase" ? 'bg-blue-600' : action === "decrease" ? 'bg-red-600' : 'bg-yellow-500'} px-4 py-3 rounded-md`}
                  onClick={() => handleCounter(action)}
                  disabled={writePending || isConfirming}
                >
                  {action.charAt(0).toUpperCase() + action.slice(1)} Count
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
