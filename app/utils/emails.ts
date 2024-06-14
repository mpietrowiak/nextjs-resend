import NewsletterSubscribed from "@/templates/NewsletterSubscribed";
import NewsletterUnsubscribed from "@/templates/NewsletterUnsubscribed";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendUnsubscribedEmail(
  emailDecoded: string,
  subscriptionUuid: string
) {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [emailDecoded],
    subject: "You have been unsubscribed from our newsletter",
    react: NewsletterUnsubscribed({
      email: emailDecoded,
      uuid: subscriptionUuid,
    }),
    text: "You have been unsubscribed from our newsletter. You will no longer receive emails from us.",
  });
}

export async function sendSubscribedEmail(
  email: string,
  firstName: string,
  uuid: string
) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "You have been subscribed to our newsletter! 🎉",
      react: NewsletterSubscribed({ email, firstName, uuid }),
      text: "You have been subscribed to our newsletter!",
    });
  } catch (error) {} //Sentry
}
