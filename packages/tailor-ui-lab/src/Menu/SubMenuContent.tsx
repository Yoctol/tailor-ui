import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box } from 'tailor-ui';

import { SubMenuContentWrapper } from './styles';

interface SubMenuContentProps {
  active: boolean;
  title: string;
  placement: 'top' | 'bottom';
  header?: ReactNode;
  subMenuContentSpringProps: any;
}

const SubMenuContent: FunctionComponent<SubMenuContentProps> = ({
  active,
  title,
  header,
  placement,
  subMenuContentSpringProps,
  children,
}) => {
  const headerRef = useRef<any>(null);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    if (headerRef.current !== null) {
      setHeaderTop(headerRef.current.offsetHeight);
    }
  }, [active, title]);

  if (!active) {
    return null;
  }

  const placementStyle =
    placement === 'bottom' ? { bottom: 0 } : { top: -headerTop };

  return (
    <SubMenuContentWrapper
      style={{ ...subMenuContentSpringProps, ...placementStyle }}
    >
      <Box ref={headerRef} pb="1">
        <Box pl="3" fontSize="sm" color="light" style={{ opacity: 0.5 }}>
          {title}
        </Box>
        {header}
      </Box>
      <Box
        borderTop="base"
        borderBottom="base"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        {children}
      </Box>
    </SubMenuContentWrapper>
  );
};

export default SubMenuContent;