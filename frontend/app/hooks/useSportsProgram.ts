"use client";

import { useMemo } from "react";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "../idl/sports_prediction.json";

export const useSportsProgram = () => {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    const program = useMemo(() => {
        if (!wallet) return null;

        const provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: "processed",
        });

        try {
            // Convert IDL to a plain JS object to bypass module-specific behavior
            const rawIdl = JSON.parse(JSON.stringify(idl));
            return new Program(rawIdl, provider);
        } catch (e) {
            console.error("Failed to initialize Program:", e);
            return null;
        }
    }, [connection, wallet]);

    return { program };
};
