import React from 'react';

import { render } from 'test/test-utils';

import { Container } from '../Container';

describe('Container', () => {
  it('should render correctly', () => {
    const { container } = render(
      <div>
        <Container title="Title A">
          <Container.Section title="Subtitle #1">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
          <Container.Section title="Subtitle #2">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
        </Container>

        <Container title="Title B">
          <Container.Section title="Subtitle #1">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
          <Container.Section title="Subtitle #2">
            Subtitles are text derived from either a transcript or screenplay of
            the dialog or commentary in films.
          </Container.Section>
        </Container>
      </div>
    );

    expect(container).toMatchSnapshot();
  });
});
