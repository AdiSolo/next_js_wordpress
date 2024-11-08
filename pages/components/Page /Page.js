import MainMenu from "../MainMenu";
import BlockRenderer from "../BlockRenderer";
const Page = (props) => {
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
};

export default Page;
