import React, { FC, ReactNode } from 'react';

import { BoxProps } from '../Layout/Box';

import {
  StyledContainer,
  StyledContainerTitle,
  StyledSection,
  StyledSectionTitle,
} from './styles';

export interface SectionProps extends Omit<BoxProps, 'color'> {
  title?: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children, ...props }) => {
  return (
    <StyledSection {...props}>
      {title && <StyledSectionTitle>{title}</StyledSectionTitle>}
      {children}
    </StyledSection>
  );
};

export interface ContainerProps extends Omit<BoxProps, 'color'> {
  title?: ReactNode;
}

const Container: FC<ContainerProps> & {
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
