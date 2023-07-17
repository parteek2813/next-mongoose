// Mechanism-> in the login screen, give button to reset password and then make new screen for
//  we can have option for user to reset passoword.
// for resetting password, take the email from user.
// We will be using the mailer , for sending the email to
// enable user to forget password
// create an API for that as well, as soon as email sent and submit button clicked
// create an axios request for that
// use nodemailer to send token to him and also send token
// to database as well
// based on the token in the url, based on the token , first verify token is valid or not
// if yes display "forget password token invalid/expired"
// otherwise display two fields "password" and "confirm password"
// and submit button.... as soon as submit button is clicked
// token, pass and conf pass ... based on that first verify toke valid ot not
// if token is valid, grab user again based on token and update pass fields
// for pass fields encrypt the things again too.!!

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  // user data state
  const [user, setUser] = useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailsent, setMailsent] = useState(false);

  // onresetpassword function
  const onResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", user);
      setMailsent(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // useEffects for length check
  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl sm:text-6xl text-center font-bold">
        Reset Password
      </h1>
      <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

      {mailsent ? (
        <div className="mt-4 text-3xl">Mail sent successfully.</div>
      ) : (
        <div className="w-5/6 sm:w-1/2">
          <label htmlFor="email" className="text-lg mb-2">
            Email
          </label>
          <input
            className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />

          <button
            onClick={onResetPassword}
            className="w-full p-4 font-bold rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Sending.." : "Send reset code"}
          </button>

          <div className="mt-4 text-center">
            Remember your password? <Link href="/login">Visit Login page</Link>
          </div>
        </div>
      )}
    </div>
  );
}
