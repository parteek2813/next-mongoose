import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"; // connect with userDb
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

const JWT_SECRET_KEY = "nextjsyoutube";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // if user exists and pass is correct, then create a token and then send to user in user cookies
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // create response for user
    const response = await NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // response cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response; // always return response after setting cookies
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
