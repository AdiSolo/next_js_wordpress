import BlockRenderer from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";
import { getSeo } from "utils/getSeo";

export default async function Page({ params }) {
  const resolvedParams = await params;

  const data = await getPage(resolvedParams?.slug.join("/"));
  if (!data) notFound();
  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const seo = await getSeo(resolvedParams?.slug.join("/"));
  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
  };
}
