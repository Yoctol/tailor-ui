import {
  preventBodyScroll,
  previousOverflow,
  previousPaddingRight,
} from '../preventBodyScroll';

describe('prevent-body-scroll', () => {
  it('should set overflow: hidden on body when pass true', () => {
    preventBodyScroll(true);

    expect(document.body).toHaveStyle('overflow: hidden');
    expect(document.body).toHaveStyle('padding-right: 0px');
  });

  it('should set previousOverflow & previousPaddingRight correctly', () => {
    document.body.style.overflow = 'scroll';
    document.body.style.paddingRight = '10px';

    preventBodyScroll(true);

    expect(document.body).toHaveStyle('overflow: hidden');
    expect(document.body).toHaveStyle('padding-right: 0px');

    expect(previousOverflow).toBe('scroll');
    expect(previousPaddingRight).toBe('10px');

    preventBodyScroll(false);

    expect(document.body).toHaveStyle('overflow: scroll');
    expect(document.body).toHaveStyle('padding-right: 10px');
  });
});
