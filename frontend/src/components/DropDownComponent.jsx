import React from 'react'
import { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from 'react-icons/fa';

const DropDownComponent = ({  onChange, array,label }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="inline-block text-left w-48 relative ">
    
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-20"
          onClick={() => setOpen(!open)}
        >
          {value || `Select ${label}`}
          {
            open ? <FaCaretUp className="ml-2 -mr-1 h-5 w-5"  /> :
            <FaCaretDown className="ml-2 -mr-1 h-5 w-5"  />
          }
        </button>
      </div>

  
      {open && (
        <div className=" mt-1 fixed w-[190px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-40 ">
          <ul className="py-1">
            {array.map((item) => (
              <li
                key={item}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                  value === item ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                  onChange(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDownComponent