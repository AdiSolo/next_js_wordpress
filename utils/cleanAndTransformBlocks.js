import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const asignIds = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.innerBlocks?.length) {
        asignIds(block.innerBlocks);
      }
    });
  };
  asignIds(blocks);
  return blocks;
};
