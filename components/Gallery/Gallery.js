import Image from "next/image";

export const Gallery = ({ columns, cropImages, items }) => {
  const columnWidth = 100 / columns;
  let maxHeight = 0;
  let maxWidth = 0;

  if (cropImages) {
    items.forEach((item) => {
      if (item.attributes.height > maxHeight) {
        maxHeight = item.attributes.height;
        console.log("Max width", maxHeight);
      }
      if (item.attributes.width > maxWidth) {
        maxWidth = item.attributes.width;
      }
      console.log(maxHeight);
    });
  }
  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {items.map((item) => (
        <div
          key={item.id}
          style={{ width: `${columnWidth}%` }}
          className="p-5 flex flex-grow"
        >
          <Image
            src={item.attributes.url}
            width={maxWidth || item.attributes.width}
            height={maxHeight || item.attributes.height}
            alt="image-gallery"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}
    </div>
  );
};
