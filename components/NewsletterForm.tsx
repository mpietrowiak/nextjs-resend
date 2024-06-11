"use client";

import { FormEvent } from "react";

export default function NewsletterForm() {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ email: formData.get("email") }),
    });
    const data = await response.json();
    // console.log(data);
    if (data?.id) {
      alert("Subscribed");
    } else {
      alert("Failed to subscribe");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="text-black"
      />
      <button>Subscribe</button>
    </form>
  );
}
