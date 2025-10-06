import React from "react";

interface Props {
  children: React.ReactNode;
  desc: string;
  size: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = ({ children, desc, size, open, setOpen }: Props) => {
  if (open)
    return (
      <div className="flex-center fixed inset-0 z-[1000] bg-neutral-900/50">
        <div
          className={`relative w-full rounded-2xl bg-blue-100 p-6 shadow-xl dark:bg-neutral-800 ${size}`}
        >
          <button
            className="absolute top-3 right-3 cursor-pointer text-neutral-800 hover:text-red-500 dark:text-neutral-300"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <h2 className="text-neutral-800 dark:text-white">{desc}</h2>

          {children}
        </div>
      </div>
    );
};
export default Modal;
