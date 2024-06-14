import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });
const docClient = DynamoDBDocumentClient.from(client);

export async function getSubscriber(email: string) {
  const response = await docClient.send(
    new QueryCommand({
      TableName: "Subscribers",
      KeyConditionExpression: "pk = :email and sk = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
      ConsistentRead: true,
    })
  );

  return response;
}

export async function addSubscriber(email: string, subscriptionUuid: string) {
  return await docClient.send(
    new PutItemCommand({
      TableName: "Subscribers",
      Item: {
        pk: { S: email },
        sk: { S: email },
        uuid: { S: subscriptionUuid },
      },
    })
  );
}

export async function removeSubscriber(email: string) {
  return await docClient.send(
    new DeleteCommand({
      TableName: "Subscribers",
      Key: {
        pk: email,
        sk: email,
      },
    })
  );
}
