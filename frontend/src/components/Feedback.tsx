import React from "react";

const Feedback = () => {
  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold text-center">send us your feedback</h2>
      <form className="max-w-md mx-auto mt-4 space-y-4">
        <div>
          <label className="block mb-2 font-semibold" htmlFor="feedback">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Feedback;
