import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";
import BlockRenderer from "./components/BlockRenderer";
export default function Home(props) {
  console.log("Props", props.blocks);
  return (
    <div>
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
}
export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/homepage-next/") {
          ... on Page {
            id
            title
            blocks(postTemplate: false)
          }
        }
      }
    `,
  });
  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
    },
  };
};
