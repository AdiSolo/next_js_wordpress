import Image from "next/image";
export const Cover = ({ children, background }) => {
  return (
    <div>
      <Image
        src={background}
        fill
        className="object-cover justify-center align-middle"
      />
      {children}
    </div>
  );
};
