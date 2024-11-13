import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

const Heading = ({ textAlign = "left", content, level = 1 }) => {
  const tag = React.createElement(`h${level}`, {
    style: { textAlign },
    className: `font-heading, max-w-5xl mx-auto my-5 ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`,
    dangerouslySetInnerHTML: { __html: content },
  });

  return tag;
};

export default Heading;
