"use client";
import { useState } from "react";

export default function Home() {
  return (
    <div className="bg-primary h-screen grid font-[family-name:var(--font-geist-sans)] overflow-y-hidden">
      <div className="px-[15em] py-[2em]">
        <div className="w-full backdrop-blur-xl flex justify-between border-[1px] border-white p-4 rounded-lg items-center bg-gray-700">
          <h3 className="text-black text-2xl font-bold">💳 Uka's Counter</h3>
          <button className="bg-black px-4 py-3 rounded-md">
            Connect Wallet
          </button>
        </div>
        <div className="min-w-2xl flex justify-center items-center">
          <div className="flex flex-col gap-5 backdrop-blur-xl border-[1px] border-white rounded-lg mt-[10em] p-[2em] justify-center items-center">
            <h4 className="text-black text-2xl">Current count is:</h4>
            <h1 className="text-black text-[5em]">10</h1>
            <div className="flex gap-5">
              <button className="bg-blue-600 px-4 py-3 rounded-md relative">
                Increase count
              </button>
              <button className="bg-red-600 px-4 py-3 rounded-md relative">
                Decrease count
              </button>
              <button className="bg-yellow-500 px-4 py-3 rounded-md relative">
                Reset count
              </button>
              <button className="bg-black px-4 py-3 rounded-md relative">
                Get count
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
