// Reference: https://github.com/segmentio/evergreen/blob/master/src/lib/prevent-body-scroll.js
let previousOverflow: string;
let previousPaddingRight: string;

/**
 * Toggle the body scroll / overflow and additional styling
 * necessary to preserve scroll position and body width (scrollbar replacement)
 *
 * @param {boolean} preventScroll - whether or not to prevent body scrolling
 */
const preventBodyScroll = (preventScroll: boolean) => {
  const { width } = document.body.getBoundingClientRect();

  /** Apply or remove overflow style */
  if (preventScroll) {
    previousOverflow = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = previousOverflow || '';
  }

  /** Get the _new width_ of the body (this will tell us the scrollbar width) */
  const newWidth = document.body.getBoundingClientRect().width;
  const scrollBarWidth = newWidth - width;

  /** If there's a diff due to scrollbars, then account for it with padding */
  if (preventScroll) {
    previousPaddingRight = document.body.style.paddingRight || '';
    document.body.style.paddingRight = `${Math.max(0, scrollBarWidth || 0)}px`;
  } else {
    document.body.style.paddingRight = previousPaddingRight || '';
  }
};

export default preventBodyScroll;
