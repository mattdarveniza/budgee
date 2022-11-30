import { Link } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { createCategory } from "~/models/categories.server";

import { validator } from "./CategoryForm";
import { CategoryForm } from "./CategoryForm";
import { validationError } from "remix-validated-form";

export const action: ActionFunction = async ({ request }) => {
  // TODO: remove me
  await new Promise((res) => setTimeout(res, 1000));

  const { data, error } = await validator.validate(await request.formData());
  if (error) {
    return validationError(error);
  }

  await createCategory(data);

  return redirect("/config/categories");
};

export default function NewCategory() {
  return (
    <CategoryForm>
      <Link to=".." className="text-blue-600 underline">
        Cancel
      </Link>
    </CategoryForm>
  );
}
