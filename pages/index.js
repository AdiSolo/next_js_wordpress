import client from "client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

import BlockRenderer from "./components/BlockRenderer";
import { mapMainMenuItems } from "utils/mapMainMenuItems";
import MainMenu from "./components/MainMenu";
export default function Home(props) {
  console.log("Props", props);
  return (
    <div>
      <MainMenu
        items={props.mainMenuItems}
        ctaLabel={props.callToActionLabel}
        ctaDestination={props.callToActionDestination}
      />
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
        mainMenu {
          aCFMainMenu {
            menuItemsGroup {
              menuItems {
                menuLabel
                destination {
                  nodes {
                    uri
                  }
                }
                subMenuItems {
                  subMenuItemLabel
                  destination {
                    nodes {
                      uri
                    }
                  }
                }
              }
            }
            callToActionButton {
              callToActionLabel
              callToActionDestination {
                nodes {
                  uri
                }
              }
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      mainMenuItems: mapMainMenuItems(
        data?.mainMenu?.aCFMainMenu?.menuItemsGroup?.menuItems || [],
      ),
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      callToActionLabel:
        data?.mainMenu?.aCFMainMenu.callToActionButton.callToActionLabel,
      callToActionDestination:
        data?.mainMenu?.aCFMainMenu.callToActionButton.callToActionDestination
          .nodes?.[0]?.uri,
    },
  };
};
