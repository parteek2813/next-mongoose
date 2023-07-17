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

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  // useEffect for email
  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  //   onEmailSubmit function
  const onEmailSubmit = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="pb-3">Forgot Password</h1>
      <h2 className="pb-4">Please enter your email:</h2>

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      ></input>

      <button
        onClick={onEmailSubmit}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
      >
        {buttonDisabled ? "No Submit" : "Submit"}
      </button>
    </div>
  );
}

export default LoginPage;
