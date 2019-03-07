export const applyHighlights = ({
  suggestions,
  value,
  highlightInvalid,
}: {
  suggestions: string[];
  value: string;
  highlightInvalid: boolean;
}) => {
  const transformedValue = value.replace(/\n$/g, '\n\n');
  const mentionRegexp = /\{{2}[^{}\n]+\}{2}/g;
  const allSuggestions = suggestions.join('|');

  const replacer = (match: string) => {
    let valid = true;

    if (highlightInvalid) {
      const validRegexp = new RegExp(`{{2}(${allSuggestions})}{2}`, 'g');
      valid = validRegexp.test(match);
    }

    return `<span class="mention-highlight ${
      !valid ? 'invalid' : ''
    }">${match}</span>`;
  };

  return transformedValue.replace(mentionRegexp, replacer);
};
