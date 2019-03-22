import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  /**
   * Tab's value
   */
  value: string;
}

export const Tab: FunctionComponent<TabProps> = ({
  children,
  value,
  ...props
}) => {
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
  /**
   * Initial active Tab's value, if `activeValue` is not set.
   */
  defaultValue?: string;
  /**
   * Current Tab's value
   */
  value?: string;
  /**
   * Callback executed when active tab is changed
   */
  onChange?: (activeValue: string) => void;
  /**
   * Preset tab bar size
   */
  size?: Size;
  /**
   * Type of tab
   */
  type?: Type;
}

const Tabs: FunctionComponent<TabsProps> & {
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
        setValue: newValue => {
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

export default Tabs;