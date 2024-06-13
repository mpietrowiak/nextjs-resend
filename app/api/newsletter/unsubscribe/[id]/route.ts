import { EmailTemplate } from "@/components/email/email-template";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export async function GET(req: Request) {
  try {
    // TODO: Implement your own logic here
    return Response.json({
      message: "Hello world",
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
