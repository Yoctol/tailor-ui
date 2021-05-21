import React, {
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CSSProperties } from 'styled-components';

interface FixedColumn {
  width: number;
  fixed?: 'left' | 'right';
  colSpan?: number;
}

interface Column extends FixedColumn {
  index: number;
}

const FixedColumnContext = createContext<{
  setColumn: (column: Column) => void;
  getColumnFixedInfo: (payload: { index: number; style?: CSSProperties }) => {
    style?: CSSProperties;
    fixed?: boolean;
    showScrollShadowStart?: boolean;
    showScrollShadowEnd?: boolean;
    isLastFixedLeft?: boolean;
    isFirstFixedRight?: boolean;
  };
}>({
  setColumn: () => {},
  getColumnFixedInfo: () => ({}),
});

const useFixedColumnContext = () => useContext(FixedColumnContext);

const useFixedHeadColumn = ({
  index,
  width,
  fixed,
  style,
  colSpan,
}: {
  index: number;
  width: number;
  fixed?: 'left' | 'right';
  style?: CSSProperties;
  colSpan?: number;
}) => {
  const { setColumn, getColumnFixedInfo } = useFixedColumnContext();

  useEffect(() => {
    setColumn({
      index,
      width,
      fixed,
      colSpan,
    });
  }, [index, width, fixed, colSpan, setColumn]);

  return useMemo(
    () => getColumnFixedInfo({ index, style }),
    [getColumnFixedInfo, index, style]
  );
};

interface FixedColumnContextProviderProps {
  scrollShadowStart: boolean;
  scrollShadowEnd: boolean;
  children: ReactNode;
}

const FixedColumnContextProvider = memo<FixedColumnContextProviderProps>(
  function FixedColumnContextProvider({
    children,
    scrollShadowStart,
    scrollShadowEnd,
  }) {
    const [fixedColumns, setFixedColumns] = useState<FixedColumn[]>([]);

    const setColumn = useCallback((column: Column) => {
      if (column.index === -1) {
        return;
      }

      setFixedColumns((prevColumns) => [
        ...prevColumns.slice(0, column.index),
        column,
        ...prevColumns.slice(column.index + 1),
      ]);
    }, []);

    const fixedColumnsInfo = useMemo(() => {
      return fixedColumns.map((fixedColumn, index) => {
        if (fixedColumn.fixed === 'left') {
          const offsetWidth = fixedColumns
            .slice(0, index)
            .reduce((prev, curr) => prev + curr.width, 0);
          const isLastFixedLeft =
            Math.abs(
              fixedColumns
                .slice()
                .reverse()
                .findIndex((column) => column.fixed === 'left') -
                (fixedColumns.length - 1)
            ) === index;

          return {
            ...fixedColumn,
            isLastFixedLeft,
            style: {
              left: offsetWidth,
            },
          };
        }

        if (fixedColumn.fixed === 'right') {
          const offsetWidth = fixedColumns
            .slice(index + 1)
            .reduce((prev, curr) => prev + curr.width, 0);
          const isFirstFixedRight =
            fixedColumns.findIndex((column) => column.fixed === 'right') ===
            index;

          return {
            ...fixedColumn,
            isFirstFixedRight,
            style: {
              right: offsetWidth,
            },
          };
        }

        return { ...fixedColumn, style: {} };
      });
    }, [fixedColumns]);

    const getColumnFixedInfo = useCallback(
      ({ index, style }: { index: number; style?: CSSProperties }) => {
        const targetColumn = fixedColumnsInfo[index];

        if (!targetColumn) {
          return {
            style,
          };
        }

        if ('isLastFixedLeft' in targetColumn && targetColumn.isLastFixedLeft) {
          return {
            fixed: true,
            isLastFixedLeft: targetColumn.isLastFixedLeft,
            showScrollShadowStart: scrollShadowStart,
            style: {
              ...style,
              ...targetColumn.style,
            },
          };
        }

        if (
          'isFirstFixedRight' in targetColumn &&
          targetColumn.isFirstFixedRight
        ) {
          return {
            fixed: true,
            isFirstFixedRight: targetColumn.isFirstFixedRight,
            showScrollShadowEnd: scrollShadowEnd,
            style: {
              ...style,
              ...targetColumn.style,
            },
          };
        }

        return {
          fixed: typeof targetColumn.fixed === 'string',
          style: {
            ...style,
            ...targetColumn.style,
          },
        };
      },
      [fixedColumnsInfo, scrollShadowStart, scrollShadowEnd]
    );

    const value = useMemo(
      () => ({
        setColumn,
        getColumnFixedInfo,
      }),
      [setColumn, getColumnFixedInfo]
    );

    return (
      <FixedColumnContext.Provider value={value}>
        {children}
      </FixedColumnContext.Provider>
    );
  }
);

export {
  FixedColumnContextProvider,
  useFixedColumnContext,
  useFixedHeadColumn,
};
