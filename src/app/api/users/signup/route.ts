import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"; // connect with userDb
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody; //destructuring
    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email }); // this will give query if not awaits

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
