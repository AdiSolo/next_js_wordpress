import Cover from "../Cover";

const BlockRenderer = ({ blocks = [] }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/cover":
        return (
          <Cover key={block.id} background={block.attributes.url}>
            Cover
          </Cover>
        );
      default:
        return null;
    }
  });
};

export default BlockRenderer; // Ensure this is the default export
