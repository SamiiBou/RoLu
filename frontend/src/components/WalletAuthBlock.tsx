import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MiniKit } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://8462f73dd85b.ngrok.app";

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

    try {
      // Get nonce and nonceId from the backend
      const nonceUrl = `${BACKEND_URL}/api/nonce`;
      console.log("Fetching nonce from:", nonceUrl);

      // Axios interceptors to log request and response
      axios.interceptors.request.use((request) => {
        console.log("Axios Request:", request);
        return request;
      });
      axios.interceptors.response.use(
        (response) => {
          console.log("Axios Response:", response);
          return response;
        },
        (error) => {
          console.error("Axios Response Error:", error);
          return Promise.reject(error);
        }
      );

      const nonceResponse = await axios.get(nonceUrl, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Axios response (nonce):", nonceResponse.data);
      const { nonce, nonceId } = nonceResponse.data;
      console.log("Nonce received:", nonce);
      console.log("NonceId received:", nonceId);

      // Execute walletAuth command with MiniKit
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
      console.log("Final payload received:", finalPayload);

      if (finalPayload.status === "error") {
        console.error("Error returned by walletAuth:", finalPayload);
        setWalletAuthResponse(finalPayload);
        return;
      }

      // Verify SIWE signature
      const completeSiweUrl = `${BACKEND_URL}/api/complete-siwe`;
      console.log("Sending SIWE verification to:", completeSiweUrl);

      const siweResponse = await axios.post(
        completeSiweUrl,
        { payload: finalPayload, nonce, nonceId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Axios response (complete-siwe):", siweResponse.data);
      const verificationResult = siweResponse.data;
      console.log("SIWE verification result:", verificationResult);

      if (verificationResult.status === "success" && verificationResult.isValid) {
        console.log("Wallet authentication successful, redirecting to /success");
        setWalletAuthResponse(finalPayload);
        navigate("/success");
      } else {
        console.error("SIWE verification failed:", verificationResult);
        setWalletAuthResponse(verificationResult);
      }
    } catch (error) {
      console.error("Error during communication:", error);
      setWalletAuthResponse({ error: error.message });
    }
    console.log("=== End of handleWalletAuth ===");
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={handleWalletAuth}
        style={{
          backgroundColor: "#222",
          borderColor: "#444",
          color: "#fff",
        }}
      >
        Connect with Wallet
      </Button>
      {/* {walletAuthResponse && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            marginTop: "20px"
          }}
        >
          {JSON.stringify(walletAuthResponse, null, 2)}
        </pre>
      )} */}
    </div>
  );
};