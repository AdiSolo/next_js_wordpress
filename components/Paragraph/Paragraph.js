import React from "react";
import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";
const Paragraph = ({ textAlign = "left", content, textColor }) => {
  const paragraph = React.createElement(`p`, {
    style: { color: textColor, textAlign },
    className: `font-heading, max-w-5xl mx-auto my-5 ${getTextAlign(textAlign)}`,
    dangerouslySetInnerHTML: { __html: relativeToAbsoluteUrls(content) },
  });
  return paragraph;
};

export default Paragraph;
