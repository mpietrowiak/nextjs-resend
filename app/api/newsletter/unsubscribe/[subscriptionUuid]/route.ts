import { EmailTemplate } from "@/components/email/email-template";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export async function GET(
  req: Request,
  { params }: { params: { subscriptionUuid: string } }
) {
  const { subscriptionUuid } = params;
  try {
    return Response.json({
      subscriptionUuid,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
