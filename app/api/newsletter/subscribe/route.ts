import { EmailTemplate } from "@/components/email/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const resend = new Resend(process.env.RESEND_API_KEY);
const dynamoDb = new DynamoDBClient({ region: "eu-central-1" });

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    console.log("aaa");

    dynamoDb.send(
      new PutItemCommand({
        TableName: "Subscribers",
        Item: {
          pk: { S: email },
          sk: { S: email },
        },
      })
    );

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
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
