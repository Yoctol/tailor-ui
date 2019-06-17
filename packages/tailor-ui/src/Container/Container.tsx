import React, { FunctionComponent, ReactNode } from 'react';

import {
  StyledContainer,
  StyledContainerTitle,
  StyledSection,
  StyledSectionTitle,
} from './styles';

export interface SectionProps {
  title?: ReactNode;
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
  title?: ReactNode;
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
