import type { Category } from "@prisma/client";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

export type { Category } from "@prisma/client";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function getCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function createCategory(
  category: Pick<Category, "name" | "color">
) {
  const allCategories = await getCategories();
  const categorySlugs = allCategories.map((c) => c.slug);
  let slug = category.name.toLowerCase().trim().replace(" ", "-");

  let i = 1;
  while (categorySlugs.includes(slug)) {
    if (i === 1) {
      slug = `${slug}-${i}`;
    } else {
      slug = `${slug.slice(0, -1)}-${i}`;
    }
  }

  return prisma.category.create({ data: { ...category, slug } });
}

export async function editCategory({
  slug,
  ...data
}: Pick<Category, "slug" | "name" | "color">) {
  const category = await getCategory(slug);
  invariant(category !== null, "404");

  return prisma.category.update({
    where: { slug },
    data,
  });
}

export async function deleteCategory(slug: string) {
  const category = await getCategory(slug);
  invariant(category === null, "404");

  prisma.category.delete({ where: { slug } });
}
