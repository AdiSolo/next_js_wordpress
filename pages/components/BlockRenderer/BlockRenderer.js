import { Cover } from "../Cover/Cover";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            Cover
          </Cover>
        );
      }
      default:
        return null;
    }
  });
};
