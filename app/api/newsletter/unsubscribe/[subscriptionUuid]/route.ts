import NewsletterUnsubscribed from "@/templates/NewsletterUnsubscribed";
import { Resend } from "resend";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  QueryCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });
const docClient = DynamoDBDocumentClient.from(client);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(
  req: Request,
  { params }: { params: { subscriptionUuid: string } }
) {
  const { subscriptionUuid } = params;
  try {
    // get the record from DynamoDB
    const response = await docClient.send(
      new QueryCommand({
        TableName: "Subscribers",
        KeyConditionExpression: "pk = :subscriptionUuid",
        ExpressionAttributeValues: {
          ":subscriptionUuid": subscriptionUuid,
        },
        ConsistentRead: true,
      })
    );

    if (response?.Items?.length === 0) {
      return Response.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    await docClient.send(
      new DeleteCommand({
        TableName: "Subscribers",
        Key: {
          pk: subscriptionUuid,
          sk: subscriptionUuid,
        },
      })
    );

    if (response?.$metadata?.httpStatusCode === 200) {
      const { email } = response.Items[0];

      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: "You have been unsubscribed from our newsletter",
        react: NewsletterUnsubscribed({ uuid: subscriptionUuid }),
        text: "You have been unsubscribed from our newsletter. You will no longer receive emails from us.",
      });
    }

    return Response.json({
      subscriptionUuid,
      response,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
