import assert from 'assert';

import type {ComponentType, PropsWithChildren, ReactNode} from 'react';
import {Children, createContext, Fragment} from 'react';
import type {CardProps as BootstrapCardProps} from 'react-bootstrap';
import {Card as BootstrapCard} from 'react-bootstrap';

import {Section, SectionHeading} from '..';

export const CardContext = createContext(false);

export interface CardProps extends PropsWithChildren<BootstrapCardProps> {
  footerSlot?: ReactNode;
  headerSlot?: ReactNode;
  topImgSlot?: ReactNode;
  bottomImgSlot?: ReactNode;
  titleSlot?: ReactNode;
  subtitleSlot?: ReactNode;
}

export const Card: ComponentType<CardProps> = ({
  children,
  footerSlot,
  headerSlot,
  topImgSlot,
  bottomImgSlot,
  titleSlot,
  subtitleSlot,
  ...rest
}: CardProps) => {
  const hasHeader = !!headerSlot;

  const chunks: (ReactNode[] | ReactNode)[] = [
    [
      titleSlot && <BootstrapCard.Title>{titleSlot}</BootstrapCard.Title>,
      subtitleSlot && (
        <BootstrapCard.Subtitle>{subtitleSlot}</BootstrapCard.Subtitle>
      ),
    ].filter(Boolean),
  ];

  Children.toArray(children).forEach((child) => {
    assert(Array.isArray(chunks[0]));
    // @ts-expect-error - there's no good way to convice tsc that
    // child.type.displayName exists sometimes.
    if (child?.type?.displayName === 'ListGroup') {
      chunks.unshift(child);
      chunks.unshift([]);
    } else {
      chunks[0].push(child);
    }
  });

  chunks.reverse();

  const MaybeSection = hasHeader ? Section : Fragment;

  return (
    <CardContext.Provider value={true}>
      <Section>
        <BootstrapCard {...rest}>
          {topImgSlot && <BootstrapCard.Img variant="top" src="topImgSlot" />}
          {headerSlot && (
            <BootstrapCard.Header>
              <SectionHeading>{headerSlot}</SectionHeading>
            </BootstrapCard.Header>
          )}
          {chunks.map((chunk, index) => {
            if (Array.isArray(chunk)) {
              if (chunk.length === 0) {
                return null;
              }
              return (
                <BootstrapCard.Body key={index}>
                  <MaybeSection>
                    {chunk.map((child, i) => (
                      <Fragment
                        key={
                          typeof child === 'object' &&
                          child !== null &&
                          'key' in child
                            ? child.key ?? i
                            : i
                        }
                      >
                        {child}
                      </Fragment>
                    ))}
                  </MaybeSection>
                </BootstrapCard.Body>
              );
            }

            return chunk;
          })}

          {footerSlot && (
            <BootstrapCard.Footer>
              <MaybeSection>{footerSlot}</MaybeSection>
            </BootstrapCard.Footer>
          )}
          {bottomImgSlot && (
            <BootstrapCard.Img variant="bottom" src="topImgSlot" />
          )}
        </BootstrapCard>
      </Section>
    </CardContext.Provider>
  );
};
