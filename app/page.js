import BlockRenderer from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { getSeo } from "utils/getSeo";

export default async function Home() {
  const data = await getPage("/homepage-next/");

  return <BlockRenderer blocks={data} />;
}
export async function generateMetadata() {
  const seo = await getSeo("/homepage-next/");
  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
  };
}
