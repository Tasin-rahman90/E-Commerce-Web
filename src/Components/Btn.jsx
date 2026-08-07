import React from 'react'

const Btn = ({ text, className = "" }) => {
  return (
    <button
      className={`${className} bg-primary py-4 px-12 text-[16px] font-medium text-white rounded-sm`}
    >
      {text}
    </button>
  );
};

export default Btn;