import { withYup } from "@remix-validated-form/with-yup";
import type { ReactNode } from "react";
import { ValidatedForm } from "remix-validated-form";
import * as Yup from "yup";
import { Input, Select, SubmitButton } from "~/components/forms";

import { colorMap } from "../colorMap";

const colors = Object.keys(colorMap);

const schema = Yup.object({
  name: Yup.string().required(),
  color: Yup.string().required().oneOf(colors),
});

export const validator = withYup(schema);

type CategoryFormProps = {
  children?: ReactNode;
  defaults?: Partial<Yup.InferType<typeof schema>>;
};

export function CategoryForm({ children, defaults }: CategoryFormProps) {
  return (
    <ValidatedForm
      validator={validator}
      defaultValues={defaults}
      method="post"
      className="flex max-w-xs flex-col gap-2"
    >
      <Input name="name" label="Name" />
      <Select name="color" label="Color">
        <option value="">Select a colour</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </Select>
      <div className="flex items-center justify-between">
        {children}
        <SubmitButton />
      </div>
    </ValidatedForm>
  );
}
