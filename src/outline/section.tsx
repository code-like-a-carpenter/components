import React, {PropsWithChildren, useContext} from 'react';

export const LevelContext = React.createContext({
  outlineLevel: 0,
  styleLevel: 0,
});

export interface SectionProps {
  readonly styleRoot?: boolean | number;
}

export const Section = ({
  children,
  styleRoot,
}: PropsWithChildren<SectionProps>) => {
  if (styleRoot === true) {
    styleRoot = 1;
  }

  const {outlineLevel, styleLevel} = useContext(LevelContext);

  const newOutlineLevel = outlineLevel < 6 ? outlineLevel + 1 : 6;
  const newStyleLevel = styleRoot ? styleRoot : styleLevel + 1;

  if (newStyleLevel > newOutlineLevel) {
    throw new Error(
      `Style level may not advance faster than document outline level style${JSON.stringify(
        /* eslint-disable sort-keys */
        {
          outlineLevel,
          styleLevel,
          newOutlineLevel,
          newStyleLevel,
        },
        /* eslint-enable sort-keys */
        null,
        2
      )}`
    );
  }

  return (
    <LevelContext.Provider
      value={{outlineLevel: newOutlineLevel, styleLevel: newStyleLevel}}
    >
      {children}
    </LevelContext.Provider>
  );
};
