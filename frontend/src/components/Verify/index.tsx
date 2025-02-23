"use client";

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MiniKit,
  VerificationLevel,
  MiniAppVerifyActionErrorPayload,
  MiniAppVerifyActionSuccessPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";

import { Button } from "@worldcoin/mini-apps-ui-kit-react";

import WorkAnywhere from "./Work_Anywhere.png";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; 
};

const verifyPayload: VerifyCommandInput = {
  action: "verifyhuman", 
  signal: "",
  verification_level: VerificationLevel.Orb, 
};

export const VerifyBlock = () => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | MiniAppVerifyActionSuccessPayload | IVerifyResponse | null
  >(null);
  const navigate = useNavigate();

  const handleMiniKitVerify = useCallback(async () => {
    console.log("Starting verification with MiniKit");

    if (!MiniKit.isInstalled()) {
      console.warn("MiniKit is not installed.");
      return null;
    }
    console.log("MiniKit is installed.");
    console.log("Sending verify command with payload:", verifyPayload);

    try {
      const miniKitResult = await MiniKit.commandsAsync.verify(verifyPayload);
      console.log("Raw response from MiniKit.commandsAsync.verify:", miniKitResult);

      const { finalPayload } = miniKitResult;
      console.log("Received final payload:", finalPayload);

      if (finalPayload.status === "error") {
        console.log("Error during verify command. finalPayload:", finalPayload);
        setHandleVerifyResponse(finalPayload);
        return finalPayload;
      }

      if (finalPayload.status === "success") {
        console.log("Verification successful (status success), redirecting to the success page");
        setHandleVerifyResponse(finalPayload);
        navigate("/success");
        return finalPayload;
      }

      console.log("Unknown status in finalPayload:", finalPayload);
      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    } catch (error) {
      console.error("Error during verification with MiniKit:", error);
      return null;
    }
  }, [navigate]);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "1rem",marginLeft: "-2%" }}>
        <img
          src={WorkAnywhere}
          alt="Work Anywhere"
          style={{ width: "100%", maxWidth: "300px", height: "auto" }}
        />
      </div>

      {/* <div style={{ marginBottom: "1rem" }}>
        <Button
          variant="primary" // Options: "primary", "secondary", "tertiary", "ghost"
          size="lg"         // Options: "sm", "md", "lg"
          onClick={handleMiniKitVerify}
          style={{
            marginLeft: "10%",
            backgroundColor: "#222", 
            borderColor: "#444",     
            color: "#fff"            
          }}
        >
          Sign in with World ID
        </Button>
      </div> */}

      {/* <pre>{JSON.stringify(handleVerifyResponse, null, 2)}</pre> */}
    </div>
  );
};
