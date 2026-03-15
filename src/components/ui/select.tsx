import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ options, className, ...props }) => (
  <select
    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 ${className}`}
    {...props}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
