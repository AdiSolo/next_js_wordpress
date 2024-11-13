import { theme } from "theme";
import Cover from "../Cover";
import Heading from "../Heading";
import Paragraph from "../Paragraph";
import CallToActionButton from "../CallToActionButton";
import Columns from "../Columns";
import Column from "../Column";
import Image from "next/image";
import PropertySearch from "../PropertySearch";

const BlockRenderer = ({ blocks = [] }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.alignment}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color.text
            }
          />
        );
      }
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            textAlign={block.attributes.textAlign}
            level={block.attributes.level}
            content={block.attributes.content}
          />
        );
      }
      case "core/post-title": {
        return (
          <Heading
            key={block.id}
            textAlign={block.attributes.textAlign}
            level={block.attributes.level}
            content={block.attributes.content}
          />
        );
      }
      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />;
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer
              key={block.innerBlocks.id}
              blocks={block.innerBlocks}
            />
          </Cover>
        );
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackONMobile={block.attributes.isStackedOnMobile}
            block={block}
          >
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/column": {
        return (
          <Column key={block.id} width={block.attributes?.width || ""}>
            <BlockRenderer
              key={block.innerBlocks.id}
              blocks={block.innerBlocks}
            />
          </Column>
        );
      }
      case "core/group": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            width={block.attributes.width}
            height={block.attributes.height}
            className="rounded-md"
            alt={block.attributes.alt || ""}
            priority
          />
        );
      }
      default:
        console.log("Unknown: ", block);
        return null;
    }
  });
};

export default BlockRenderer; // Ensure this is the default export
