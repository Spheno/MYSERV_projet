import React from "react";
import PropTypes from "prop-types";

const Quote = ({ name, quote }) => (
  <blockquote className="relative p-4 text-xl italic text-gray-600 bg-gray-100 border-l-4 border-gray-500 quote">
    <div className="stylistic-quote-mark" aria-hidden="true">
      &ldquo;
    </div>
    <p className="mb-4">{quote}</p>
    <cite className="flex items-center">
      <div className="flex flex-col items-start">
        <span className="mb-1 text-sm italic font-bold">{name}</span>
      </div>
    </cite>
  </blockquote>
);

Quote.propTypes = {
  name: PropTypes.string,
  quote: PropTypes.string
};

export default Quote;
