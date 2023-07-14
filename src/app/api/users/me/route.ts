import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

// fetching the info from giving the id of the user and returning the jsong response here with calling helper functions
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request); // gives me decoded id
    const user = await User.findOne({ _id: userId }).select("-password"); // gives everything from matching id excluding password
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
