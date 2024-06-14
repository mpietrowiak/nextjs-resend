import React from "react";
import { sendUnsubscribedEmail } from "@/app/utils/emails";
import { getSubscriber, removeSubscriber } from "@/app/utils/subscribers";

export default async function UnsubscribePage({
  params: { emailBase64, subscriptionUuid },
}: {
  params: { emailBase64: string; subscriptionUuid: string };
}) {
  const emailDecoded = Buffer.from(emailBase64, "base64").toString("utf-8");
  try {
    const checkResponse = await getSubscriber(emailDecoded);
    if (checkResponse?.Items?.length === 0) {
      return <div>Subscription not found!</div>;
    }

    const deleteResponse = await removeSubscriber(emailDecoded);
    if (deleteResponse?.$metadata?.httpStatusCode === 200) {
      await sendUnsubscribedEmail(emailDecoded, subscriptionUuid);
    }
    return (
      <div>
        <h1>You have been unsubscribed!</h1>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Something went wrong - {error?.toString()}</h1>
      </div>
    );
  }
}
