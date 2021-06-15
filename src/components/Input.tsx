import React, { InputHTMLAttributes } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { InputProps } from "../types";

const Input = (
  props: UseControllerProps<InputProps> &
    InputHTMLAttributes<HTMLInputElement> & { label: string }
) => {
  const { field } = useController(props);
  return (
    <div>
      <label>{props.label}</label>
      <div className="mb-3 pt-0">
        <input
          {...field}
          {...props}
          type="text"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-200 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-60"
        />
      </div>
    </div>
  );
};
export default Input;
