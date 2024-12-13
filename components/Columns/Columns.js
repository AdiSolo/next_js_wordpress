const Columns = ({
  isStackONMobile,
  children,
  block,
  textColor,
  backgroundColor,
}) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  return (
    <div
      className="my-10 p-10"
      style={{ ...textColorStyle, ...backgroundColorStyle }}
    >
      <div
        className={`max-w-5xl w-full mx-auto ${isStackONMobile ? "block md:flex" : "flex"} `}
      >
        {children}
      </div>
    </div>
  );
};

export default Columns;
