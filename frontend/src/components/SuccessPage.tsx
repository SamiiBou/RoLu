import React, { useState } from "react";
import work2 from "./work2.png";
import { MiniKit, tokenToDecimals, Tokens } from "@worldcoin/minikit-js";

export const SuccessPage = () => {
  const [payAddress, setPayAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async () => {
    console.log("Starting payment process");
    console.log("Recipient address:", payAddress);
    console.log("Amount entered:", amount);

    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed.");
      return;
    }
    try {
      console.log("Initiating payment on backend...");
      const initRes = await fetch("https://83a6a22b1fda.ngrok.app/api/initiate-payment", { method: "POST" });
      const initData = await initRes.json();
      console.log("Response from initiate-payment:", initData);
      const { id } = initData;

      const tokenAmount = tokenToDecimals(parseFloat(amount), Tokens.WLD).toString();
      console.log("Converted token amount:", tokenAmount);
      const payload = {
        reference: id,
        to: payAddress,
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenAmount,
          },
        ],
        description: "Payment from success page",
      };
      console.log("Payment payload:", payload);

      const payResponse = await MiniKit.commandsAsync.pay(payload);
      console.log("Response from MiniKit.commandsAsync.pay:", payResponse);
      const { finalPayload } = payResponse;
      console.log("Final payload from payment command:", finalPayload);

      if (finalPayload.status === "success") {
        console.log("Payment successful, confirming payment on backend...");
        const confirmRes = await fetch("https://83a6a22b1fda.ngrok.app/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        });
        const confirmResult = await confirmRes.json();
        console.log("Response from confirm-payment:", confirmResult);
        if (confirmResult.success) {
          setPaymentStatus("Payment successful!");
        } else {
          setPaymentStatus("Payment confirmation failed.");
        }
      } else {
        console.error("Payment command failed:", finalPayload);
        setPaymentStatus("Payment failed.");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      setPaymentStatus("Payment error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen relative">
      <img
        src={work2}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center p-24 bg-white bg-opacity-80 rounded">
        <h1 className="mb-4 text-2xl font-bold">Payment</h1>
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="payAddress" className="block mb-1 font-medium">
            Recipient Address:
          </label>
          <input
            id="payAddress"
            type="text"
            value={payAddress}
            onChange={(e) => setPayAddress(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter recipient address"
          />
        </div>
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="amount" className="block mb-1 font-medium">
            Amount (WLD):
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter amount"
          />
        </div>
        <button
          onClick={handlePayment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Pay
        </button>
        {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
      </div>
    </div>
  );
};
