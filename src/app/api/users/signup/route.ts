import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"; // connect with userDb
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody; //destructuring

    // check if user already exists
    const user = await User.findOne({ email }); // this will give query based on email

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // save user in db
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // save user in db after creating
    const savedUser = await newUser.save();

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // return the response to the user
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
