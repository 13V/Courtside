"use client";

import { useMemo } from "react";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../idl/sports_prediction.json";

const PROGRAM_ID = new PublicKey("5oCaNW77tTwpAdZqhyebZ73zwm1DtfR3Ye7Cy9VWyqtT"); // Placeholder, should be the deployed ID

export const useSportsProgram = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const program = useMemo(() => {
        if (!wallet) return null;

        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: "processed",
        });

        try {
            const programId = new PublicKey("5oCaNW77tTwpAdZqhyebZ73zwm1DtfR3Ye7Cy9VWyqtT");
            console.log("Initializing Program with ID:", programId.toString());
            return new Program(idl as any, provider);
        } catch (e) {
            console.error("Failed to initialize Program:", e);
            return null;
        }
    }, [connection, wallet]);

    return { program };
};
