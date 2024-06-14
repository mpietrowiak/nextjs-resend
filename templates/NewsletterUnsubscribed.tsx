import { getResubscribeUrl } from "@/app/utils/paths";
import * as React from "react";

interface NewsletterUnsubcribedProps {
  email: string;
  uuid: string;
}

const NewsletterUnsubcribed: React.FC<Readonly<NewsletterUnsubcribedProps>> = ({
  email,
  uuid,
}) => (
  <div>
    <h1>You have been unsubscribed!</h1>

    <p>We are sorry to see you go!</p>

    <p>
      If you would like to resubscribe, please click{" "}
      <a href={getResubscribeUrl(email, uuid)}>here</a>
    </p>
  </div>
);

export default NewsletterUnsubcribed;
