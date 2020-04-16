import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

import TabContext from './TabContext';
import {
  Size,
  StyledTab,
  StyledTabs,
  TabActiveLine,
  TabLine,
  Type,
} from './styles';

export interface TabProps {
  value: string;
}

export const Tab: FC<TabProps> = ({ children, value, ...props }) => {
  const { activeTabRef, activeValue, setValue } = useContext(TabContext);

  const isActive = activeValue === value;

  return (
    <StyledTab
      ref={isActive ? activeTabRef : undefined}
      className={isActive ? 'active' : ''}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </StyledTab>
  );
};

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (activeValue: string) => void;
  size?: Size;
  type?: Type;
}

const Tabs: FC<TabsProps> & {
  Tab: typeof Tab;
} = ({
  size = 'md',
  type = 'line',
  children,
  defaultValue,
  value,
  onChange,
  ...otherProps
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);
  const [tabValue, setTabValue] = useState(defaultValue);
  const [immediate, setImmediate] = useState(true);
  const [springState, setSpringState] = useState({ offset: 0, width: 0 });

  const activeValue = value || tabValue || '';

  const props = useSpring({
    immediate,
    width: springState.width,
    transform: `translateX(${springState.offset}px)`,
  });

  useEffect(() => {
    if (springState.width !== 0) {
      setImmediate(false);
    }
  }, [springState.width]);

  useEffect(() => {
    if (type === 'line' && tabsRef.current && activeTabRef.current) {
      const tabsRect = tabsRef.current.getBoundingClientRect();
      const activeTabRect = activeTabRef.current.getBoundingClientRect();
      setSpringState({
        offset: activeTabRect.left - tabsRect.left,
        width: activeTabRect.width,
      });
    }
  }, [type, activeValue]);

  return (
    <TabContext.Provider
      value={{
        activeTabRef,
        activeValue,
        setValue: (newValue) => {
          setTabValue(newValue);

          if (onChange && newValue) {
            onChange(newValue);
          }
        },
      }}
    >
      <StyledTabs ref={tabsRef} size={size} type={type} {...otherProps}>
        {children}
        {type === 'line' && (
          <>
            <TabActiveLine style={props} />
            <TabLine />
          </>
        )}
      </StyledTabs>
    </TabContext.Provider>
  );
};

Tabs.defaultProps = {
  size: 'md',
  type: 'line',
  defaultValue: '',
};

Tabs.Tab = Tab;

export { Tabs };
