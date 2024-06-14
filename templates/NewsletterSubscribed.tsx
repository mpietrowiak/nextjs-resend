import { getUnsubscribeUrl } from "@/app/utils/paths";
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  uuid: string;
  email: string;
}
const NewsletterSubscribed: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  uuid,
  email,
}) => (
  <div>
    <h1>Welcome to my newsletter, {firstName}!</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
      doloribus ea consectetur asperiores rerum autem nesciunt nulla sunt ab,
      dolor molestiae ad qui illum veniam! Odit quaerat magni saepe nostrum.
    </p>

    <small>
      <a href={getUnsubscribeUrl(email, uuid)}>Unsubscribe</a>
    </small>
  </div>
);

export default NewsletterSubscribed;
