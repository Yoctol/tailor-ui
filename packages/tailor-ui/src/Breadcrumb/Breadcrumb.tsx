import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  createRef,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MdKeyboardArrowRight, MdMoreHoriz } from 'react-icons/md';

import { useMeasure } from '@tailor-ui/hooks';

import { Box, Flex } from '../Layout';
import { Dropdown } from '../Dropdown';
import { Ellipsis } from '../Ellipsis';
import { Icon } from '../Icon';
import { Position } from '../constants';

import { MoreIcon, StyledBreadcrumbLink } from './styles';

export interface BreadcrumbLinkProps {
  active: boolean;
  name: ReactNode;
  lockWidth: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ active, name, lockWidth, onClick }, ref) {
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
  }
);

export interface BreadcrumbItem {
  key: string;
  name: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbItemProps {
  items: BreadcrumbItem[];
}

const HiddenBreadcrumb: FC<BreadcrumbItemProps> = ({ items }) => {
  return (
    <Dropdown
      position={Position.BOTTOM}
      overlay={
        <Dropdown.List>
          {items.map(({ key, name, onClick }) => (
            <Dropdown.Item key={key} onClick={onClick}>
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      }
    >
      <MoreIcon type={MdMoreHoriz} fill="gray400" cursor="pointer" />
    </Dropdown>
  );
};

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  function Breadcrumb({ items = [] }, forwardedRef) {
    const [{ ref }, bound] = useMeasure(forwardedRef);
    const [measured, setMeasured] = useState(false);
    const [hiddenKeys, setHiddenKeys] = useState<string[]>(
      items.map((item) => item.key)
    );

    const itemWithRefs = useMemo(
      () =>
        items.map((attrs) => ({
          ...attrs,
          itemRef: createRef<HTMLAnchorElement>(),
        })),
      [items]
    );

    useEffect(() => {
      setMeasured(false);

      if (
        bound.width !== 0 &&
        itemWithRefs.every(({ itemRef }) => itemRef.current?.offsetWidth)
      ) {
        let containerWidth = bound.width - 48;

        const keys = [...itemWithRefs]
          .reverse()
          .reduce<string[]>((prev, { key, itemRef }, index) => {
            const hasArrow = index !== 0;
            containerWidth -=
              (itemRef.current as HTMLAnchorElement).offsetWidth +
              (hasArrow ? 24 : 0);

            if (containerWidth < 0) {
              return [...prev, key];
            }

            return prev;
          }, []);

        setHiddenKeys(keys);
        setMeasured(true);
      }
    }, [bound.width, itemWithRefs]);

    const hiddenItems = items.filter(({ key }) => hiddenKeys.includes(key));

    if (items.length === 0) {
      return null;
    }

    return (
      <Flex
        ref={ref}
        flex="auto"
        alignItems="center"
        overflow="hidden"
        style={{
          opacity: measured ? 1 : 0,
          transition: 'transition: all 200ms ease 0s',
        }}
      >
        {hiddenItems.length > 0 && <HiddenBreadcrumb items={hiddenItems} />}
        {itemWithRefs.map(
          ({ key, itemRef, name, onClick = () => {} }, index) => {
            const hidden = hiddenKeys.includes(key);
            const active = index === itemWithRefs.length - 1;
            const arrow = index !== 0 && (
              <Icon type={MdKeyboardArrowRight} fill="gray400" />
            );

            return (
              <Box
                key={key}
                display="inline-flex"
                overflow="hidden"
                width={hidden ? 0 : 'auto'}
              >
                {arrow}
                <BreadcrumbLink
                  ref={itemRef}
                  active={active}
                  name={name}
                  lockWidth={items.length !== 1}
                  onClick={(event) => {
                    if (!active) {
                      onClick(event);
                    }
                  }}
                />
              </Box>
            );
          }
        )}
      </Flex>
    );
  }
);

export { Breadcrumb };
