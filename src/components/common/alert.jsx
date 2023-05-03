import React, { useState, useEffect } from "react";

const Alert = ({ type, message, show, setShow }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(show);
    const timeout = setTimeout(() => setShowAlert(false), 5000);
    return () => clearTimeout(timeout);
  }, [show]);

  const handleClose = () => {
    setShowAlert(false);
    setShow(false);
  };

  const alertClassNames = {
    success: "bg-green-50 border-green-500 text-green-900",
    error: "bg-red-50 border-red-500 text-red-900",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-900",
    info: "bg-blue-50 border-blue-500 text-blue-900",
  };

  const svgIcons = {
    success: (
      <svg
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    warning: (
      <svg
        className="h-6 w-6 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M12 17v.01"
        />
      </svg>
    ),
    info: (
      <svg
        className="h-6 w-6 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16M8 12h8"
        />
      </svg>
    ),
  };

  return (
    showAlert && (
      <div
        className={` z-50 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end`}
      >
        <div
          className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border-l-4 ${alertClassNames[type]}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">{svgIcons[type]}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={handleClose}
                className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
)
);
};

export default Alert;