import React, { FC, ReactNode } from 'react';

import { Box, BoxProps } from '../Layout/Box';
import { Divider } from '../Divider';
import { Heading, Text } from '../Typography';

import { StyledContainer, StyledSection, StyledSectionTitle } from './styles';

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
  subTitle?: ReactNode;
}

const Container: FC<ContainerProps> & {
  Section: typeof Section;
} = ({ title, subTitle, children, ...props }) => {
  return (
    <StyledContainer {...props}>
      {title && <Heading.H4 mb="8px">{title}</Heading.H4>}
      {subTitle && (
        <Box mb="16px">
          <Text color="gray500" fontSize="sm">
            {subTitle}
          </Text>
        </Box>
      )}
      {(title || subTitle) && <Divider mb="24px" />}
      {children}
    </StyledContainer>
  );
};

Container.Section = Section;

export { Container };
