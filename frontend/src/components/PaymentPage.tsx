import React from "react";
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from "@worldcoin/minikit-js";

const PaymentPage = () => {
  const sendPayment = async () => {
    try {
      // 1. Call your backend API to initiate the payment and obtain a unique identifier
      const res = await fetch("http://localhost:3001/api/initiate-payment", { method: "POST" });
      const { id } = await res.json();

      // 2. Build the payment payload
      const payload: PayCommandInput = {
        reference: id, // Unique identifier to link the transaction
        to: "0x1234",  // Destination address
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(0.01, Tokens.WLD).toString(), // 0.01 WLD
          },
        ],
        description: "Send 0.01 WLD to 0x1234",
      };

      // 3. Check if MiniKit is installed (otherwise, the user won't be able to use the wallet)
      if (!MiniKit.isInstalled()) {
        alert("MiniKit is not installed on your browser!");
        return;
      }

      // 4. Send the payment command via MiniKit
      const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

      // 5. If the response indicates success, call your confirmation endpoint to verify the payment on your backend
      if (finalPayload.status === "success") {
        const confirmRes = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: finalPayload }),
        });
        const confirmation = await confirmRes.json();
        if (confirmation.success) {
          alert("Payment successful and confirmed!");
        } else {
          alert("Payment initiated but not confirmed. Please try again.");
        }
      } else {
        alert("The payment failed.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred during the payment.");
    }
  };

  return (
    <div className="payment-page" style={{ textAlign: "center" }}>
      <h1>Send 0.01 WLD to 0x1234</h1>
      <button onClick={sendPayment} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
        Send Payment
      </button>
    </div>
  );
};

export default PaymentPage;
