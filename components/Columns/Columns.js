const Columns = ({ isStackONMobile, children, block }) => {
  return (
    <div className="my-10">
      <div
        className={`max-w-5xl w-full mx-auto ${isStackONMobile ? "block md:flex" : "flex"} `}
      >
        {children}
      </div>
    </div>
  );
};

export default Columns;
