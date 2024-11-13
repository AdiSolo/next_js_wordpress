import Link from "next/link";

const ButtonLink = ({ label, destination }) => {
  return (
    <div className="inline-flex">
      <Link href={destination} className="btn">
        {label}
      </Link>
    </div>
  );
};
export default ButtonLink;
