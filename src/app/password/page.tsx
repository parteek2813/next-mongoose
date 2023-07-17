"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // updatePassword function
  const updatePassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/password", { token, password });
      setPasswordUpdated(true);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  //   useEffect for password
  useEffect(() => {
    if (password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);

  // take out the token from url
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1] || "none";
    setToken(urlToken);
  }, []);

  // useEffect for verifying the token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("/api/users/password", {
          params: { token, password },
        });
        console.log(response);
        setTokenVerified(true);
      } catch (error: any) {
        setError(true);
      }
    };

    console.log(tokenVerified);
    console.log(passwordUpdated);

    // verify the token only if length greater than 0
    if (token.length > 0) {
      verifyToken();
      console.log("Verify token working");
    }
  }, [token, password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl sm:text-6xl text-center font-bold">
        Update Password
      </h1>
      <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

      {/* if token verified and password not updated */}
      {tokenVerified && !passwordUpdated && (
        <div className="w-5/6 sm:w-1/2">
          <label htmlFor="password" className="text-lg mb-2">
            Password
          </label>
          <input
            className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button
            onClick={updatePassword}
            className="w-full p-4 text-bold rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Updating.." : "Confirm Password"}
          </button>
        </div>
      )}

      {/* if password updated */}
      {passwordUpdated && (
        <div className="mt-4 text-3xl">Password updated.</div>
      )}

      {/* if some error occured and password not updated */}
      {error && !passwordUpdated && (
        <div className="mt-8">
          <h2 className="p-5 text-4xl text-center bg-red-500 text-white">
            Invalid Token
          </h2>
        </div>
      )}
    </div>
  );
}
