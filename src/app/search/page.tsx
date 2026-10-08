import type { Metadata } from "next";

import { SearchView } from "@/components/account/SearchView";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  // key resets the input and sort when the query changes
  return <SearchView key={query} query={query} />;
}
