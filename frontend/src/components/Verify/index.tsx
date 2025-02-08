"use client";

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MiniKit,
  VerificationLevel,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";

// Import the button from the UI Kit
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

// Define the payload type for verification
export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "verifyhuman", // Your action defined in your Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Options: Orb | Device
};

export const VerifyBlock = () => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);
  const navigate = useNavigate();

  const handleMiniKitVerify = useCallback(async () => {
    console.log("Starting verification with MiniKit");

    // Check if MiniKit is installed
    if (!MiniKit.isInstalled()) {
      console.warn("MiniKit is not installed.");
      return null;
    }
    console.log("MiniKit is installed.");
    console.log("Sending verify command with payload:", verifyPayload);

    try {
      // Call MiniKit's verify command
      const miniKitResult = await MiniKit.commandsAsync.verify(verifyPayload);
      console.log("Raw response from MiniKit.commandsAsync.verify:", miniKitResult);

      const { finalPayload } = miniKitResult;
      console.log("Received final payload:", finalPayload);

      // In case of an error, display the error message
      if (finalPayload.status === "error") {
        console.log("Error during verify command. finalPayload:", finalPayload);
        setHandleVerifyResponse(finalPayload);
        return finalPayload;
      }

      // If verification is successful, redirect to the success page
      if (finalPayload.status === "success") {
        console.log("Verification successful (status success), redirecting to the success page");
        setHandleVerifyResponse(finalPayload);
        navigate("/success");
        return finalPayload;
      }

      // In case of an unknown status
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
      <div style={{ marginBottom: "1rem" }}>
        {/* Using the button from the UI Kit */}
        <Button
          variant="primary" // Options: "primary", "secondary", "tertiary", "ghost"
          size="lg"         // Options: "sm", "md", "lg"
          onClick={handleMiniKitVerify}
        >
          Sign in with World ID
        </Button>
      </div>
      {/* <pre>{JSON.stringify(handleVerifyResponse, null, 2)}</pre> */}
    </div>
  );
};
