import React from 'react';

export const DescriptionListContext = React.createContext(false);

export const DescriptionList: React.FC = ({children}) => {
  return (
    <DescriptionListContext.Provider value={true}>
      <dl className="description-list">{children}</dl>
    </DescriptionListContext.Provider>
  );
};
