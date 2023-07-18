import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string; password: string } }
) {
  try {
    // find the token and password
    const token = request.nextUrl.searchParams.get("token");
    console.log("token from pass route ", token);
    const password = request.nextUrl.searchParams.get("password");

    // find with the token and password in db
    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });

    // if user found
    if (user) {
      console.log("user has been found");
      return NextResponse.json({
        message: "Correct Token",
        success: true,
      });
    } else {
      console.log("user has not been found");
    }

    // else return invalid token error
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // check if user exists already or not
    const user = await User.findOne({
      forgetPasswordToken: token,
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });

    //  if user not found
    if (!user) {
      return NextResponse.json(
        { error: "Error updating password." },
        { status: 400 }
      );
    }

    // else update hashed password in db
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // update the fields in the db too with new password
    user.password = hashedPassword;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordTokenExpiry = undefined;
    await user.save();

    // password updated successfully
    return NextResponse.json({
      message: "Password updated successfully.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
