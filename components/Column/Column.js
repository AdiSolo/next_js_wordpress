const Column = ({ children, width }) => {
  const widthStyle = width
    ? { maxWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };
  return (
    <div style={widthStyle} className="px-5">
      {children}
    </div>
  );
};

export default Column;
