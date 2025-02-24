//backend/src/verify.ts
import {
  verifyCloudProof,
  IVerifyResponse,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import { Profile } from "./models/Profile.js";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

export const verifyHandler: RequestHandler = async (req, res) => {
  console.log("--- Received POST /api/complete-siwe request ---");
  const { payload, action, signal } = req.body as IRequestPayload;

  const app_id = process.env.APP_ID as `app_${string}`;
  const verifyRes = (await verifyCloudProof(
    payload,
    app_id,
    action,
    signal
  )) as IVerifyResponse;

  console.log("World Verification result:", verifyRes);

  //if (verifyRes.success) {
  //  res.status(200).json({ verifyRes });
  //  return;
  //} else {
  //  res.status(400).json({ verifyRes });
  //  return;
  //}
  if (verifyRes.success) {
    // Assume payload contains an Ethereum address
    // Look up the user profile; if it doesn't exist, create it
    let user = await Profile.findOne({ ethereumAddress: payload.address });
    if (!user) {
      user = await Profile.create({
        ethereumAddress: payload.address,
        username: payload.address, // or derive a username
        fullName: "New User", // or use data from payload if available
        email: "", // Fill in as needed
        profilePic: "", // Fill in if available
      });
    }
    // Issue a JWT token that encodes the user's _id
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ verifyRes, token });
    return;
  } else {
    res.status(400).json({ verifyRes });
    return;
  }
};
