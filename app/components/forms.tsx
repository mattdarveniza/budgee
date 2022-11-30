import classNames from "classnames";
import type { ReactNode } from "react";
import { useField, useIsSubmitting } from "remix-validated-form";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

type FieldProps = {
  name: string;
  label: string;
  children?: ReactNode;
};

export function Field({ name, label, children }: FieldProps) {
  const { error } = useField(name);
  return (
    <label>
      {label}
      {children}
      <em className="text-red-600 empty:hidden">{error}</em>
    </label>
  );
}

type InputProps = {
  name: string;
  label: string;
};

export function Input({ name, label }: InputProps) {
  const { getInputProps } = useField(name);
  return (
    <Field name={name} label={label}>
      <input
        type="text"
        {...getInputProps({ id: name })}
        className={inputClassName}
      />
    </Field>
  );
}

export function Select({ name, label, children }: FieldProps) {
  const { getInputProps } = useField(name);
  return (
    <Field name={name} label={label}>
      <select
        {...getInputProps({ id: name })}
        className={classNames(inputClassName, "capitalize")}
      >
        {children}
      </select>
    </Field>
  );
}

type SubmitButtonProps = {
  actionText?: string;
  loadingText?: string;
};

export function SubmitButton({
  actionText = "Submit",
  loadingText = "Submitting...",
}: SubmitButtonProps) {
  const isSubmitting = useIsSubmitting();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
    >
      {isSubmitting ? loadingText : actionText}
    </button>
  );
}
