import { EmailTemplate } from "@/components/email/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const resend = new Resend(process.env.RESEND_API_KEY);
const dynamoDb = new DynamoDBClient({ region: "eu-central-1" });

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
    dynamoDb.send(
      new PutItemCommand({
        TableName: "Subscribers",
        Item: {
          pk: { S: uuid },
          sk: { S: uuid },
          email: { S: email },
        },
      })
    );

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({ firstName, uuid }),
      text: "Hello world",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
