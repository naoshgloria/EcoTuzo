import React from "react";

const FAQ = () => {
  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold text-center">FAQ</h2>
      <div className="mt-4 space-y-4">
        <details className="p-4 bg-white rounded-md shadow-md">
          <summary className="font-semibold">What is Eco Tuzo?</summary>
          <p>Eco Tuzo is an organization dedicated to promoting environmental sustainability.</p>
        </details>
        <details className="p-4 bg-white rounded-md shadow-md">
          <summary className="font-semibold">How can I participate?</summary>
          <p>You can participate by joining our community and taking part in our events.</p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
