import React, { FC, ReactNode, isValidElement } from 'react';

import { Box, BoxProps } from '../Layout/Box';
import { Divider } from '../Divider';
import { Heading, Text } from '../Typography';

import { StyledContainer, StyledSection } from './styles';

export interface SectionProps extends Omit<BoxProps, 'color'> {
  title?: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children, ...props }) => {
  return (
    <StyledSection {...props}>
      {title && <Heading.H5 mb="8px">{title}</Heading.H5>}
      {children}
    </StyledSection>
  );
};

const isElementTable = (element: ReactNode) =>
  isValidElement(element) &&
  ((element.type as unknown) as { displayName: string }).displayName ===
    'Table';

interface ContainerTitleProps {
  title?: ReactNode;
  subTitle?: ReactNode;
}

const ContainerTitle: FC<ContainerTitleProps> = ({ title, subTitle }) => {
  return (
    <Box pt="24px" px="32px">
      {title && <Heading.H4 mb="8px">{title}</Heading.H4>}
      {subTitle && (
        <Box mb="8px">
          <Text color="gray500" fontSize="sm">
            {subTitle}
          </Text>
        </Box>
      )}

      <Divider mb="24px" />
    </Box>
  );
};

interface ContainerChildrenProps {
  hasTitle: boolean;
}

const ContainerChildren: FC<ContainerChildrenProps> = ({
  hasTitle,
  children,
}) => {
  const hasChildrenTable = Array.isArray(children)
    ? children.some(isElementTable)
    : isElementTable(children);

  if (!hasChildrenTable) {
    return (
      <Box px="32px" pb="32px" pt={hasTitle ? '0' : '24px'}>
        {children}
      </Box>
    );
  }

  if (!Array.isArray(children)) {
    return <>{children}</>;
  }

  const childrenIndex =
    (Array.isArray(children) &&
      children.findIndex((child) => isElementTable(child))) ||
    -1;

  return (
    <>
      {children.slice(0, childrenIndex).length > 0 && (
        <Box py="24px" px="32px">
          {children.slice(0, childrenIndex)}
        </Box>
      )}

      {children[childrenIndex]}

      {children.slice(childrenIndex + 1).length > 0 && (
        <Box py="24px" px="32px">
          {children.slice(childrenIndex + 1)}
        </Box>
      )}
    </>
  );
};

export type ContainerProps = Omit<BoxProps, 'color'> & ContainerTitleProps;

const Container: FC<ContainerProps> & {
  Section: typeof Section;
} = ({ title, subTitle, children, ...props }) => {
  const hasTitle = Boolean(title || subTitle);

  return (
    <StyledContainer {...props}>
      {hasTitle && <ContainerTitle title={title} subTitle={subTitle} />}
      <ContainerChildren hasTitle={hasTitle}>{children}</ContainerChildren>
    </StyledContainer>
  );
};

Container.Section = Section;

export { Container };
