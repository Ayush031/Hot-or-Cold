"use client"
import React, { useEffect, useState } from 'react';
import { dryrun } from '@permaweb/aoconnect/browser';

export default function Page() {
    const [TokenScore, setTokenScore] = useState({});
    useEffect(() => {
        const GetScore = async () => {
          try {
            const result = await dryrun({
              process: "P0Hw4GQzawz8y6Jk4JhGxGkpi7sz6cvk0bmvXu_UwSs",
              tags: [{ name: "Action", value: "Get" }],
            });

            if (result.Messages[0].Data) {
              const Scores = JSON.parse(result.Messages[0].Data);
              setTokenScore(Scores);
            } else {
              console.error("No data found in result.Messages");
            }
          } catch (error) {
            console.error("Error fetching scores:", error);
          }
        };
        GetScore();
      }, [TokenScore]);

      console.log(TokenScore);

  return (
    <div>page</div>
  );
}