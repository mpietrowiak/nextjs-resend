import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  uuid: string;
}
const NewsletterSubscribed: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  uuid,
}) => (
  <div>
    <h1>Welcome to my newsletter, {firstName}!</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
      doloribus ea consectetur asperiores rerum autem nesciunt nulla sunt ab,
      dolor molestiae ad qui illum veniam! Odit quaerat magni saepe nostrum.
    </p>

    <small>
      <a
        href={`${process.env.PRODUCTION_URL}api/newsletter/unsubscribe/${uuid}`}
      >
        Unsubscribe
      </a>
    </small>
  </div>
);

export default NewsletterSubscribed;
