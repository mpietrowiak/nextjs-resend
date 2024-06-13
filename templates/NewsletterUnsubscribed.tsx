import * as React from "react";

interface NewsletterUnsubcribedProps {
  uuid: string;
}

const NewsletterUnsubcribed: React.FC<Readonly<NewsletterUnsubcribedProps>> = ({
  uuid,
}) => (
  <div>
    <h1>You have been unsubscribed!</h1>

    <p>We are sorry to see you go!</p>

    <p>
      If you would like to resubscribe, please click{" "}
      <a href={`https://www.example.com/api/newsletter/subscribe/${uuid}`}>
        here
      </a>
    </p>
  </div>
);

export default NewsletterUnsubcribed;
