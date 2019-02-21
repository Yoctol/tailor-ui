import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

const getIndicesOf = (searchStr: string, str: string) => {
  const searchStrLen = searchStr.length;

  if (searchStrLen === 0) {
    return [];
  }

  let startIndex = 0;
  let index = str.indexOf(searchStr, startIndex);
  const indices = [];

  while (index > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
    index = str.indexOf(searchStr, startIndex);
  }

  return indices;
};

const getEntityRanges = (
  text: string,
  mentionName: string,
  mentionKey: number
) => {
  const indices = getIndicesOf(mentionName, text);

  if (indices.length > 0) {
    return indices.map(offset => ({
      key: mentionKey,
      length: mentionName.length,
      offset,
    }));
  }

  return null;
};

const convertStringToEditorState = (text: string, tags: string[]) => {
  const rawContent = convertToRaw(ContentState.createFromText(text));

  const rawState = tags.map(tag => ({
    type: 'mention',
    mutability: 'IMMUTABLE',
    data: tag,
  }));

  (rawContent as any).entityMap = [...rawState];

  rawContent.blocks = rawContent.blocks.map(block => {
    const ranges: {
      key: number;
      length: number;
      offset: number;
    }[] = [];

    tags.forEach((tag, index) => {
      const entityRanges = getEntityRanges(block.text, `@${tag}`, index);
      if (entityRanges) {
        ranges.push(...entityRanges);
      }
    });

    return { ...block, entityRanges: ranges };
  });

  const contentState = convertFromRaw(rawContent);

  return EditorState.createWithContent(contentState);
};

export default convertStringToEditorState;
