import React from "react";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: PropTypes) {
  return (
    <div onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center bg-black/20 transition-all ${open ? "visible" : "invisible"}`}>
      <div onClick={(e) => e.stopPropagation()}
        className={`fixed flex flex-col overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 ${open
          ? "opacity-100 scale-100"
          : "opacity-0 scale-110"
          } w-[70%] max-w-[600px] h-[60%] max-h-[500px]`}>
        <button onClick={onClose}
          className="absolute top-[13px] right-[13px] h-10 w-10 border-2 border-gray-300 rounded text-gray-500 text-base bg-white hover:bg-gray-100 hover:text-black transition"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}