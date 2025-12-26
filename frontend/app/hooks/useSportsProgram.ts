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
        if (!wallet || !wallet.publicKey) {
            return null;
        }

        try {
            const provider = new AnchorProvider(connection, wallet, {
                preflightCommitment: "processed",
            });

            // Standard constructor for Anchor 0.30+
            return new Program(idl as any, provider);
        } catch (e: any) {
            console.error("useSportsProgram Error:", e.message);
            return null;
        }
    }, [connection, wallet]);

    return { program };
};
