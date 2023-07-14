import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Create a response object
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Set cookie as empty value and expired date
    if (response.cookies.set("token", "", { httpOnly: true })) {
      console.log("cookies set correctly");
    } else {
      console.log("cookie was not set ");
    }

    console.log(response.cookies.get("token")?.value);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
