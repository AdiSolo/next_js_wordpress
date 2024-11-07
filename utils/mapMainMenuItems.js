import { v4 as uuid } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  return menuItems.map((menuItem) => ({
    id: uuid(),
    destination: menuItem.destination?.nodes?.[0]?.uri, // Access the uri from the first node in nodes array
    label: menuItem.menuLabel,
    subMenuItems: (menuItem.subMenuItems || []).map((subMenuItem) => ({
      id: uuid(),
      destination: subMenuItem.destination?.nodes?.[0]?.uri, // Access the uri from the first node in nodes array for subMenuItem
      label: subMenuItem.subMenuItemLabel,
    })),
  }));
};
