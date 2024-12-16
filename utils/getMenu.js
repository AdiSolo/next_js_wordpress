import { mapMainMenuItems } from "./mapMainMenuItems";

export const getMenu = async () => {
  const params = {
    query: `
      query MenuQuery {
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
  };

  const response = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const { data } = await response.json();

  return {
    mainMenuItems: mapMainMenuItems(
      data?.mainMenu?.aCFMainMenu?.menuItemsGroup?.menuItems || [],
    ),

    callToActionLabel:
      data?.mainMenu?.aCFMainMenu.callToActionButton.callToActionLabel,
    callToActionDestination:
      data?.mainMenu?.aCFMainMenu.callToActionButton.callToActionDestination
        .nodes?.[0]?.uri,
  };
};
