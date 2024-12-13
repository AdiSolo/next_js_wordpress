const Column = ({ children, width, textColor, backgroundColor }) => {
  const widthStyle = width
    ? { maxWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  return (
    <div
      style={{ ...widthStyle, ...textColorStyle, ...backgroundColorStyle }}
      className="px-5"
    >
      {children}
    </div>
  );
};

export default Column;
