/* eslint-disable */

"use client";

import React from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { abi } from "../ABI/ABI";
import Link from "next/link";
import { useContext } from "react";
import { ModalContext } from "./../../context/index";

const Claim = () => {
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const [numbers, setNumbers] = React.useState<number[]>([]);
  const modal = useContext(ModalContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numArray = value
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));
    setNumbers(numArray);
  };

  const result = useReadContract({
    abi,
    address: "0x58172B314187e35892DeEc5DD0e2f847893e5405",
    functionName: "balanceOf",
    args: [address],
  });

  console.log(result.data);
  if (address === undefined)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white px-4 text-center">
        {(() => {
          if (result.data === BigInt(0)) {
            return (
              <div className=" flex flex-col justify-center items-center text-2xl gap-4 text-center">
                You are not eligible to claim Soup NFT
                <img src="sad.gif" alt="" height={90} width={90} />
                <Link href={"/"} className=" text-[#f4b41b]">
                  Go to Mint →
                </Link>
              </div>
            );
          } else if (result.data == undefined) {
            return (
              <div className=" flex flex-col justify-center items-center text-2xl gap-4">
                Connect Wallet to check eligibility
                <div className="wallet-connect   px-4 py-2  ">
                  <button
                    className=" items-center flex uppercase"
                    onClick={() => {
                      modal.open();
                    }}
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <>
                <div className=" flex flex-col justify-center items-center gap-4 text-2xl text-center">
                  You are eligible to claim Soup NFT
                  <h1>Input Token ID</h1>
                  <input
                    type="text"
                    placeholder=""
                    onChange={handleInputChange}
                    className="mb-4 text-black"
                  />
                </div>
                <button
                  className="px-4 py-2 mint-button"
                  onClick={async () => {
                    try {
                      writeContract({
                        address: "0x58172B314187e35892DeEc5DD0e2f847893e5405",
                        abi,
                        functionName: "mintFree",
                        args: numbers,
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  CLAIM MY SOUP
                </button>
              </>
            );
          }
        })()}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white text-center">
      {(() => {
        if (result.data === BigInt(0)) {
          return (
            <div className=" flex flex-col justify-center items-center text-2xl gap-4">
              You are not eligible to claim Soup NFT
              <img src="sad.gif" alt="" height={90} width={90} />
              <Link href={"/"} className=" text-[#f4b41b]">
                Go to Mint →
              </Link>
            </div>
          );
        } else if (result.data == undefined) {
          return (
            <div className=" flex flex-col justify-center items-center text-2xl gap-4">
              Checking eligibility...
            </div>
          );
        } else {
          return (
            <>
              <div className=" flex flex-col justify-center items-center gap-4 text-2xl">
                You are eligible to claim Soup NFT
                <h1>Input Token ID</h1>
                <input
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                  className="mb-4 text-black"
                />
              </div>
              <button
                className="px-4 py-2 mint-button"
                onClick={async () => {
                  try {
                    writeContract({
                      address: "0x58172B314187e35892DeEc5DD0e2f847893e5405",
                      abi,
                      functionName: "mintFree",
                      args: numbers,
                    });
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                CLAIM MY SOUP
              </button>
            </>
          );
        }
      })()}
    </div>
  );
};

export default Claim;
