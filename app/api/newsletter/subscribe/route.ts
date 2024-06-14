import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendSubscribedEmail } from "@/app/utils/emails";
import { addSubscriber } from "@/app/utils/subscribers";

export async function POST(req: Request) {
  const { email, firstName } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!firstName) {
    return NextResponse.json(
      { error: "First name is required" },
      { status: 400 }
    );
  }
  const uuid = uuidv4();
  try {
    const response = await addSubscriber(email, uuid);
    if (response?.$metadata?.httpStatusCode === 200) {
      await sendSubscribedEmail(email, firstName, uuid);
      return Response.json({
        success: true,
      });
    } else {
      return Response.json({
        success: false,
      });
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
