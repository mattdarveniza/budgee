import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import classNames from "classnames";

import type { Category } from "~/models/categories.server";
import { getCategories } from "~/models/categories.server";
import { colorMap } from "./colorMap";

type LoaderData = {
  categories: Awaited<Category[]>;
};

export const loader = async () =>
  json<LoaderData>({
    categories: await getCategories(),
  });

export default function Categories() {
  const { categories } = useLoaderData<LoaderData>();
  return (
    <div className="p-5">
      <h1 className="pb-2 text-2xl font-bold">Config</h1>
      <nav>
        <h2 className="pb-2 text-xl font-bold">Categories</h2>
        <ul className="inline-block list-inside list-disc">
          {categories.map((category) => (
            <li
              key={category.name}
              className="flex items-center justify-between gap-x-2 pb-2"
            >
              <Link to={`${category.slug}`} className="text-blue-600 underline">
                {category.name}
              </Link>
              <div
                className={classNames(
                  "w-10",
                  "aspect-square",
                  colorMap[category.color]
                )}
              />
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
