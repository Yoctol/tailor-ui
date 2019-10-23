import React, {
  FC,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  MdKeyboardArrowRight,
  MdKeyboardBackspace,
  MdMoreHoriz,
} from 'react-icons/md';

import { Box, Flex } from '../Layout';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { Ellipsis } from '../Ellipsis';
import { Heading } from '../Typography';
import { Icon } from '../Icon';
import { Position } from '../constants';

import { MoreIcon, StyledBreadcrumbLink } from './styles';

export interface BreadcrumbLink {
  active: boolean;
  name: ReactNode;
  lockWidth: boolean;
  onClick: () => void;
  onMeasure: (width: number) => void;
}

const BreadcrumbLink: FC<BreadcrumbLink> = ({
  active,
  name,
  lockWidth,
  onClick,
  onMeasure,
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current) {
      onMeasure(ref.current.offsetWidth);
    }
  }, [name, onMeasure]);

  return (
    <StyledBreadcrumbLink
      ref={ref}
      active={active}
      lockWidth={lockWidth}
      onClick={onClick}
    >
      <Ellipsis>{name}</Ellipsis>
    </StyledBreadcrumbLink>
  );
};

export interface PageHeaderProps {
  title?: ReactNode;
  extra?: ReactNode;
  breadcrumb?: { key: string; name: ReactNode; onClick: () => void }[];
  onBack?: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  onBack,
  breadcrumb = [],
  extra,
}) => {
  const [measured, setMeasured] = useState(false);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [breadcrumbsWidth, setBreadcrumbsWidth] = useState<
    { key: string; width: number }[]
  >([]);

  useEffect(() => {
    if (
      breadcrumbRef.current &&
      breadcrumbsWidth.length === breadcrumb.length &&
      !measured
    ) {
      let containerWidth = breadcrumbRef.current.offsetWidth - 48;

      const keys = breadcrumbsWidth.reverse().reduce(
        (prev, curr, index) => {
          const hasArrow = index !== 0;
          containerWidth -= curr.width + (hasArrow ? 24 : 0);

          if (containerWidth < 0 && !prev.includes(curr.key)) {
            return [...prev, curr.key];
          }

          return prev;
        },
        [] as string[]
      );

      setBreadcrumbsWidth([]);
      setHiddenKeys(keys);
      setMeasured(true);
    }
  }, [breadcrumb.length, breadcrumbsWidth, measured]);

  const hiddenBreadcrumb = breadcrumb.filter(({ key }) =>
    hiddenKeys.includes(key)
  );

  const visibleBreadcrumb = breadcrumb.filter(
    ({ key }) => !hiddenKeys.includes(key)
  );

  return (
    <Flex alignItems="center" height="56px" px="32px" bg="light">
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
          <Box
            pr="12px"
            mr="12px"
            maxWidth="240px"
            borderRight="base"
            borderColor="gray300"
          >
            <Heading.h5 letterSpacing="0.2px" color="gray500">
              <Ellipsis>{title}</Ellipsis>
            </Heading.h5>
          </Box>
        )}
        <Flex
          ref={breadcrumbRef}
          flex="auto"
          alignItems="center"
          overflow="hidden"
          style={{
            opacity: measured ? 1 : 0,
            transition: 'transition: all 200ms ease 0s',
          }}
        >
          {hiddenBreadcrumb.length > 0 && (
            <>
              <Dropdown
                position={Position.BOTTOM}
                overlay={
                  <Dropdown.List>
                    {hiddenBreadcrumb.map(({ key, name, onClick }) => (
                      <Dropdown.Item key={key} onClick={onClick}>
                        {name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.List>
                }
              >
                <MoreIcon type={MdMoreHoriz} fill="gray400" cursor="pointer" />
              </Dropdown>
              <Icon type={MdKeyboardArrowRight} fill="gray400" />
            </>
          )}
          {visibleBreadcrumb.map(({ key, name, onClick }, index) => {
            const active = index === visibleBreadcrumb.length - 1;
            const arrow = index !== 0 && (
              <Icon type={MdKeyboardArrowRight} fill="gray400" />
            );

            return (
              <Fragment key={key}>
                {arrow}
                <BreadcrumbLink
                  active={active}
                  name={name}
                  lockWidth={breadcrumb.length !== 1}
                  onMeasure={width => {
                    if (
                      !breadcrumbsWidth[index] ||
                      breadcrumbsWidth[index].width !== width
                    ) {
                      setBreadcrumbsWidth(prev => {
                        const clonePrev = [...prev];
                        clonePrev[index] = { key, width };

                        return clonePrev;
                      });
                    }
                  }}
                  onClick={onClick}
                />
              </Fragment>
            );
          })}
        </Flex>
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
