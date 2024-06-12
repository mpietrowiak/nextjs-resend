import NewsletterForm from "@/components/NewsletterForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-5xl font-bold mb-4">Subscribe to our newsletter!</h1>
      <p>To get the latest updates.</p>
      <NewsletterForm />
    </div>
  );
}
