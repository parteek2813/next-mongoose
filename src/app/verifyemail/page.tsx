"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//  FLOW OF THIS: As soon as somebody lands on this page, we will fetch token from urlToken and set this TOKEN in
// setToken hook and as soons as TOKEN updated in TOKEN usestate, useEffect will be called as token was the dependency array
// and when that happens. verifyUserEmail() function will be finally called

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data); // can use error.response.data as this will be axios request
    }
  };

  //   extract from url and convert to array
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  // if we have valid token then run the verifyUserEmail otherwise not using
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl"> Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black"> Error</h2>
        </div>
      )}
    </div>
  );
}
