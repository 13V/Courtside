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
        console.log("useSportsProgram: Checking wallet...", wallet?.publicKey?.toString());

        if (!wallet || !wallet.publicKey) {
            console.log("useSportsProgram: No wallet or publicKey found.");
            return null;
        }

        try {
            const provider = new AnchorProvider(connection, wallet, {
                preflightCommitment: "processed",
            });

            // THE DEFINITIVE FIX: 
            // 1. Convert IDL string to plain object to break any module proxying
            // 2. Force 'publicKey' -> 'pubkey' (lowercase) for Anchor 0.30+ compatibility
            const idlString = JSON.stringify(idl).replace(/"publicKey"/g, '"pubkey"');
            const rawIdl = JSON.parse(idlString);

            const programId = new PublicKey("5oCaNW77tTwpAdZqhyebZ73zwm1DtfR3Ye7Cy9VWyqtT");

            console.log("useSportsProgram: Initializing Program with ID:", programId.toString());
            console.log("useSportsProgram: Finalized IDL types:", rawIdl.types);
            console.log("useSportsProgram: Finalized IDL accounts:", rawIdl.accounts);
            console.log("useSportsProgram: Finalized IDL instructions:", rawIdl.instructions);

            // Pass BOTH the fixed IDL and the explicit programId
            const p = new Program(rawIdl, programId, provider);

            console.log("useSportsProgram: Program initialized successfully!");
            return p;
        } catch (e: any) {
            console.error("useSportsProgram: CRITICAL FAILURE during Program initialization!");
            console.error("Error message:", e.message);
            console.error("Error stack:", e.stack);
            return null;
        }
    }, [connection, wallet]);

    return { program };
};
