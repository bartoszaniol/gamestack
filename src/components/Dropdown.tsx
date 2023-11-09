import { signOut } from "next-auth/react";
import { useState } from "react";

const Dropdown = (props: { userName: string; userEmail: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 right-0 m-4 flex flex-col rounded-md border-4 bg-gray-500 p-2 text-white">
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-bold text-white hover:cursor-pointer focus:outline-none"
      >
        <span>{props.userName}</span>
        <svg
          className="ml-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            // stroke-linecap="round"
            stroke-linejoin="round"
            strokeLinecap="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="flex flex-col gap-3">
          <div>
            <span>Logged as {props.userEmail}</span>
            <hr />
          </div>
          <button
            className="text-white"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
