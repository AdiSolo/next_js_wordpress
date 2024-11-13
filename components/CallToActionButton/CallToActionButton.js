import Link from "next/link";
import ButtonLink from "../ButtonLink";

const CallToActionButton = ({ buttonLabel, destination, align }) => {
  return (
    <div className={`block my-1 align text-${align}`}>
      <ButtonLink label={buttonLabel} destination={"/"} />
    </div>
  );
};
export default CallToActionButton;
