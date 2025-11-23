import React from "react";

const TestColors = () => {
  return (
    <div className="p-6">
      <div className="bg-soft-cream text-soft-text p-4 rounded-md mb-4">
        This div uses <code>bg-soft-cream</code> and <code>text-soft-text</code>
        .
      </div>
      <div className="bg-soft-pink text-white p-4 rounded-md mb-4">
        This div uses <code>bg-soft-pink</code> and white text.
      </div>
      <div className="bg-soft-lavender text-soft-accent p-4 rounded-md mb-4">
        This div uses <code>bg-soft-lavender</code> and{" "}
        <code>text-soft-accent</code>.
      </div>
    </div>
  );
};

export default TestColors;
