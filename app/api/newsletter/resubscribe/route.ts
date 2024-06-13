import { EmailTemplate } from "@/components/email/email-template";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(req: Request) {
  try {
    return Response.json({
      todo: "method to resubscribe by updating the record in DynamoDB",
    });
  } catch (error) {
    // console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
