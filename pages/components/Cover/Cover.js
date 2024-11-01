import Image from "next/image";

const Cover = ({ children, background }) => {
  return (
    <div>
      <Image
        src={background}
        fill
        className="object-cover justify-center align-middle"
        alt="img"
      />
      {children}
    </div>
  );
};

export default Cover; // Make sure this is the default export
