import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { Category } from "~/models/categories.server";
import { editCategory } from "~/models/categories.server";
import { getCategory } from "~/models/categories.server";

import { CategoryForm, validator } from "./CategoryForm";
import { validationError } from "remix-validated-form";

type LoaderData = { category: Category };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.category, `params.catgeory is required`);
  const category = await getCategory(params.category);

  if (!category) {
    throw new Response(`Category ${params.category} not found`, {
      status: 404,
    });
  }
  return json<LoaderData>({ category });
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.category, `params.catgeory is required`);
  const slug = params.category;

  console.log("slug: ", slug);
  const { data, error } = await validator.validate(await request.formData());
  if (error) {
    return validationError(error);
  }

  await editCategory({ slug, ...data });

  return redirect("/config/categories");
};

export default function CategorySlug() {
  const { category } = useLoaderData<LoaderData>();

  return (
    <section>
      <h3>Edit {category.name}</h3>
      <CategoryForm defaults={category}>
        <div className="flex items-center gap-2">
          <Link to=".." className="text-blue-600 underline">
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => {}}
            className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
          >
            Delete
          </button>
        </div>
      </CategoryForm>
      <Outlet />
    </section>
  );
}
