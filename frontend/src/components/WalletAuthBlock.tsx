"use client";

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios (npm install axios)
import { MiniKit } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://t-ynax7jlg.tunn.dev";

export const WalletAuthBlock = () => {
  const [walletAuthResponse, setWalletAuthResponse] = useState(null);
  const navigate = useNavigate();

  const handleWalletAuth = useCallback(async () => {
    console.log("=== Starting handleWalletAuth ===");

    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed.");
      return;
    }
    console.log("MiniKit is installed.");

    // Retrieving the nonce via Axios
    const nonceUrl = `${BACKEND_URL}/api/nonce`;
    console.log("Nonce retrieval URL:", nonceUrl);

    try {
      const nonceResponse = await axios.get(nonceUrl, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": window.location.origin
      },
    });
    console.log("Axios response (nonce):", nonceResponse);

      // Axios returns the data directly in .data
      const nonceData = nonceResponse.data;
      console.log("Received nonce data:", nonceData);
      const { nonce } = nonceData;

      // Executing the walletAuth command with MiniKit
      const walletAuthResult = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        requestId: "0",
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
        statement:
          "This is my statement and here is a link https://worldcoin.com/apps",
      });
      console.log("Complete walletAuth result:", walletAuthResult);

      const { finalPayload } = walletAuthResult;
      console.log("Final payload received from walletAuth:", finalPayload);

      if (finalPayload.status === "error") {
        console.error("Error returned by walletAuth:", finalPayload);
        setWalletAuthResponse(finalPayload);
        return;
      }

      // Sending the SIWE verification via Axios
      const completeSiweUrl = `${BACKEND_URL}/api/complete-siwe`;
      console.log("SIWE verification URL:", completeSiweUrl);

      const siweResponse = await axios.post(
        completeSiweUrl,
        { payload: finalPayload, nonce },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("Axios response (complete-siwe):", siweResponse);

      const verificationResult = siweResponse.data;
      console.log(
        "SIWE verification result received from the backend:",
        verificationResult
      );

      if (verificationResult.status === "success" && verificationResult.isValid) {
        console.log("Wallet authentication successful, redirecting to /success");
        setWalletAuthResponse(finalPayload);
        navigate("/success");
      } else {
        console.error("SIWE verification failed:", verificationResult);
        setWalletAuthResponse(verificationResult);
      }
    } catch (error) {
      console.error("Detailed error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      setWalletAuthResponse({ error: error.message });
    }

    console.log("=== Ending handleWalletAuth ===");
  }, [navigate]);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Button variant="primary" size="lg" onClick={handleWalletAuth}
        style={{
            // marginLeft: "7%",
            backgroundColor: "#222", 
            borderColor: "#444",     
            color: "#fff"            
          }}
        >
          Connect with Ethereum Wallet
        </Button>
      </div>
      {walletAuthResponse && (
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(walletAuthResponse, null, 2)}
        </pre>
      )}
    </div>
  );
};
