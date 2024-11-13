import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="min-h-[400px] text-center bg-slate-800 h-[calc(100vh-64px)] relative text-white flex justify-center items-center">
      <Image
        src={background}
        fill
        className="object-cover justify-center align-middle mix-blend-soft-light"
        alt="img"
        priority
      />
      <div className="absolute font-heading z-10 px-10"> {children}</div>
    </div>
  );
};

export default Cover; // Make sure this is the default export
