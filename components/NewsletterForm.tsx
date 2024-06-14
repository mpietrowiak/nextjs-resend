"use client";

import { FormEvent } from "react";

export default function NewsletterForm() {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        firstName: formData.get("firstName"),
      }),
    });
    const data = await response.json();
    // console.log(data);
    if (data?.success) {
      alert("Subscribed");
    } else {
      alert("Failed to subscribe");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-4 my-4">
      <input
        name="firstName"
        type="text"
        placeholder="Name"
        required
        className="text-black block placeholder:text-zinc-600 p-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="text-black block placeholder:text-zinc-600 p-2"
      />
      <button className="bg-blue-900 font-bold px-4 hover:bg-blue-800">
        Subscribe
      </button>
    </form>
  );
}
