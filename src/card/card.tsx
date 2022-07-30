import React, {useEffect, useContext, useState} from 'react';
import {
  Card as BootstrapCard,
  CardProps as BootstrapCardProps,
} from 'react-bootstrap';

import {Section, SectionHeading} from '..';
import {PropsOf} from '../support';

export const CardContext = React.createContext(false);

export type CardProps = React.PropsWithChildren<BootstrapCardProps>;

const HasHeaderContext = React.createContext<
  [boolean, (newValue: boolean) => void]
>([false, () => undefined]);

export const Card = (props: CardProps) => {
  const [hasHeader, setHasHeader] = useState(false);

  return (
    <HasHeaderContext.Provider value={[hasHeader, setHasHeader]}>
      <CardContext.Provider value={true}>
        <Section>
          <BootstrapCard {...props} />
        </Section>
      </CardContext.Provider>
    </HasHeaderContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const withSection = <P extends Object>(Component: React.ComponentType<P>) =>
  function WithSection(props: P) {
    const [hasHeader] = useContext(HasHeaderContext);

    if (hasHeader) {
      return (
        <Section>
          <Component {...props} />
        </Section>
      );
    }

    return <Component {...props} />;
  };

const CardHeader = ({
  children,
  props,
}: PropsOf<typeof BootstrapCard['Header']>) => {
  const [hasHeader, setHasHeader] = useContext(HasHeaderContext);
  useEffect(() => {
    if (!hasHeader) {
      setHasHeader(true);
    }
  });

  return (
    <BootstrapCard.Header {...props}>
      <SectionHeading>{children}</SectionHeading>
    </BootstrapCard.Header>
  );
};

Card.Img = BootstrapCard.Img;
Card.Title = BootstrapCard.Title;
Card.Subtitle = BootstrapCard.Subtitle;
Card.Body = withSection(BootstrapCard.Body);
Card.Text = withSection(BootstrapCard.Text);
Card.Header = CardHeader;
Card.Footer = withSection(BootstrapCard.Footer);
Card.ImgOverlay = BootstrapCard.ImgOverlay;
Card.Link = BootstrapCard.Link;
