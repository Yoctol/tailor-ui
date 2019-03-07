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
  const allSuggestions = suggestions.map(suggestion => `{{${suggestion}}}`);

  const replacer = (match: string) => {
    let valid = true;

    if (highlightInvalid) {
      valid = allSuggestions.includes(match);
    }

    const formatText = (text: string, index: number) => {
      const classNames = [
        'mention-highlight',
        !valid && 'invalid',
        index === 0 && 'start',
        index === match.length - 1 && 'end',
      ]
        .filter(Boolean)
        .join(' ');

      return `<span class="${classNames}">${text}</span>`;
    };

    return match
      .split('')
      .map(formatText)
      .join('');
  };

  return transformedValue.replace(mentionRegexp, replacer);
};
