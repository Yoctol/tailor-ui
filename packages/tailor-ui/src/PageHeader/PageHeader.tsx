import React, { FC, ReactNode } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';

import { Box, Flex } from '../Layout';
import { Breadcrumb, BreadcrumbProps } from '../Breadcrumb';
import { Button } from '../Button';
import { Ellipsis } from '../Ellipsis';
import { Heading } from '../Typography';

export interface PageHeaderProps extends BreadcrumbProps {
  title?: ReactNode;
  extra?: ReactNode;
  onBack?: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  onBack,
  breadcrumb = [],
  extra,
}) => {
  return (
    <Flex flex="auto" alignItems="center" height="56px" px="32px">
      <Flex alignItems="center" flex="auto" overflow="hidden">
        {onBack && (
          <Button
            icon={MdKeyboardBackspace}
            size="sm"
            mr="12px"
            variant="normal"
            rounded
            onClick={onBack}
          />
        )}
        {title && (
          <Box maxWidth="240px">
            <Heading.h5 letterSpacing="0.2px" color="gray500">
              <Ellipsis>{title}</Ellipsis>
            </Heading.h5>
          </Box>
        )}
        {title && breadcrumb.length > 0 && (
          <Box mx="12px" width="1px" height="16px" bg="gray300" />
        )}
        <Breadcrumb breadcrumb={breadcrumb} />
      </Flex>
      {extra && (
        <Flex alignItems="center" flex="none">
          {extra}
        </Flex>
      )}
    </Flex>
  );
};

export { PageHeader };
