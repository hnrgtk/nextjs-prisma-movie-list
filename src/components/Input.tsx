import React, { InputHTMLAttributes } from "react";
import { useController, UseControllerProps } from "react-hook-form";

export type FormValues = {
  title: string;
  rating: string;
  genre: string;
};

export function Input(
  props: UseControllerProps<FormValues> & InputHTMLAttributes<HTMLInputElement>
) {
  const { field } = useController(props);
  return (
    <div>
      <label>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</label>
      <div className="mb-3 pt-0">
        <input
          {...field}
          {...props}
          type="text"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-60"
        />
      </div>
    </div>
  );
}
