"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//  FLOW OF THIS: As soon as somebody lands on this page, we will fetch token from urlToken and set this TOKEN in
// setToken hook and as soons as TOKEN updated in TOKEN usestate, useEffect will be called as token was the dependency array
// and when that happens. verifyUserEmail() function will be finally called

export default function VerifyEmailPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  //   useEffect for password
  useEffect(() => {
    if (password.length >= 6 && confirmPassword.length >= 6) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  //   onPasswordSubmit function
  const onPasswordSubmit = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      ></input>

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmPassword"
        type="text"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirmPassword"
      ></input>

      <button
        onClick={onPasswordSubmit}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
      >
        {buttonDisabled ? "No Submit" : "Submit"}
      </button>
    </div>
  );
}
