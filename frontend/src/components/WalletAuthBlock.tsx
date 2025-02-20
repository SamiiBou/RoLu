import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MiniKit } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://5d66ebe5ec90.ngrok.app";

export const WalletAuthBlock = () => {
  const [walletAuthResponse, setWalletAuthResponse] = useState<any>(null);
  const navigate = useNavigate();

  const handleWalletAuth = useCallback(async () => {
    console.log("=== Starting handleWalletAuth ===");

    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed.");
      return;
    }
    console.log("MiniKit is installed.");

    try {
      // Récupération du nonce depuis le back-end
      const nonceUrl = `${BACKEND_URL}/api/nonce`;
      console.log("Récupération du nonce via :", nonceUrl);

      // Intercepteurs Axios pour tracer la requête et la réponse
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
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Réponse Axios (nonce) :", nonceResponse.data);
      const { nonce } = nonceResponse.data;
      console.log("Nonce reçu :", nonce);

      // Exécution de la commande walletAuth avec MiniKit
      const walletAuthResult = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        requestId: "0",
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
        statement:
          "This is my statement and here is a link https://worldcoin.com/apps",
      });
      console.log("Résultat walletAuth complet :", walletAuthResult);

      const { finalPayload } = walletAuthResult;
      console.log("Final payload reçu :", finalPayload);

      if (finalPayload.status === "error") {
        console.error("Erreur retournée par walletAuth :", finalPayload);
        setWalletAuthResponse(finalPayload);
        return;
      }

      // Vérification de la signature SIWE
      const completeSiweUrl = `${BACKEND_URL}/api/complete-siwe`;
      console.log("Envoi de la vérification SIWE vers :", completeSiweUrl);

      const siweResponse = await axios.post(
        completeSiweUrl,
        { payload: finalPayload, nonce },
        {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Réponse Axios (complete-siwe) :", siweResponse.data);
      const verificationResult = siweResponse.data;
      console.log("Résultat de vérification SIWE :", verificationResult);

      if (verificationResult.status === "success" && verificationResult.isValid) {
        console.log("Authentification wallet réussie, redirection vers /success");
        setWalletAuthResponse(finalPayload);
        navigate("/success");
      } else {
        console.error("Échec de la vérification SIWE :", verificationResult);
        setWalletAuthResponse(verificationResult);
      }
    } catch (error: any) {
      console.error("Erreur lors de la communication :", error);
      setWalletAuthResponse({ error: error.message });
    }
    console.log("=== Fin de handleWalletAuth ===");
  }, [navigate]);

  return (
    <div>
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
        Connect with Ethereum Wallet
      </Button>
      {walletAuthResponse && (
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(walletAuthResponse, null, 2)}
        </pre>
      )}
    </div>
  );
};
