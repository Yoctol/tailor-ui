import React, { FunctionComponent } from 'react';

import {
  StyledContainer,
  StyledContainerTitle,
  StyledSection,
  StyledSectionTitle,
} from './styles';

export interface SectionProps {
  title?: string;
}

const Section: FunctionComponent<SectionProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <StyledSection {...props}>
      {title && <StyledSectionTitle>{title}</StyledSectionTitle>}
      {children}
    </StyledSection>
  );
};

export interface ContainerProps {
  title?: string;
}

const Container: FunctionComponent<ContainerProps> & {
  Section: typeof Section;
} = ({ title, children, ...props }) => {
  return (
    <StyledContainer {...props}>
      {title && <StyledContainerTitle>{title}</StyledContainerTitle>}
      {children}
    </StyledContainer>
  );
};

Container.Section = Section;

export { Container };
