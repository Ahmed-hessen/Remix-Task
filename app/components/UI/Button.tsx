"use client";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  custom?: boolean;
  cancel?: boolean;
  type?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  label,
  disabled,
  onClick,
  custom,
  cancel,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        custom ? "bg-blue-500 text-white" : "bg-red-600 text-white"
      } ${cancel ? "bg-gray-500" : ""} rounded-md px-4 py-2`}
    >
      {label}
    </button>
  );
}
