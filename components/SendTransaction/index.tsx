import { useState, useEffect } from "react";
import {
  MiniKit,
  ResponseEvent,
  MiniAppSendTransactionPayload,
} from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { createPublicClient, http, PublicClient } from "viem";
import { worldchain } from "viem/chains";
import { Gift, CheckCircle, Loader2 } from "lucide-react";

export default function PayTransactionPage() {
  const [transactionId, setTransactionId] = useState<string>("");

  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      client: client as PublicClient,
      appConfig: {
        app_id: "app_4a42f4e6756b4a7d91980bf68d8db3ac",
      },
      transactionId: transactionId,
    });

  const sendTransactionCommand = async () => {
    const { commandPayload, finalPayload } =
      await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: "0xA0C794A7896285c893385B18E8BaF4F0eB87C836",
            abi: [
              {
                type: "function",
                name: "mint",
                inputs: [
                  { name: "amount", type: "uint256", internalType: "uint256" },
                ],
                outputs: [],
                stateMutability: "nonpayable",
              },
            ],
            functionName: "mint",
            args: ["5000000000000000000"], // 1 ether = 10^18 wei
          },
        ],
      });

    console.log("commandPayload mint ", commandPayload);
    console.log("finalPayload mint ", finalPayload);
  };

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppSendTransaction,
      async (payload: MiniAppSendTransactionPayload) => {
        if (payload.status === "error") {
          console.error("Error sending transaction", payload);
        } else {
          setTransactionId(payload.transaction_id);
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppSendTransaction);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
          <Gift className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text font-semibold text-indigo-900">Claim Rewards</h2>
      </div>

      <button
        onClick={sendTransactionCommand}
        disabled={isConfirming}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all flex items-center justify-center
          ${
            isConfirming
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          }`}
      >
        {isConfirming ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Confirming...
          </>
        ) : (
          "Send Transaction"
        )}
      </button>

      {isConfirmed && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <p className="font-medium">Transaction Confirmed!</p>
          </div>
        </div>
      )}
    </div>
  );
}
