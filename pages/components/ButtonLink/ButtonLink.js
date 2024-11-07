import Link from "next/link";

const ButtonLink = ({ label, destination }) => {
  return (
    <div className="my-auto ">
      <Link href={destination} className="btn">
        {label}
      </Link>
    </div>
  );
};
export default ButtonLink;
