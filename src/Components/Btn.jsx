import React from 'react'
import { Link } from 'react-router'

const Btn = ({ text, className = "", to, onClick, type = "button" }) => {
  const buttonClassName = `${className} rounded-sm bg-primary px-12 py-4 text-[16px] font-medium text-white transition-opacity hover:opacity-90`;

  if (to) {
    return (
      <Link to={to} className={buttonClassName}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClassName}
    >
      {text}
    </button>
  );
};

export default Btn;