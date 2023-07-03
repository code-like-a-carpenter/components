import {Card} from 'react-bootstrap';

import type {FactContainer} from './types';

/**
 * Default container for the Fact component
 *
 * Note that this uses Bootstrap's Card directly rather than the local wrapper.
 * The local wrapper does things with headings that may or may not be
 * appropriate at this time.
 */
export const FactCard: FactContainer = ({
  label,
  output,
  colSpan,
  rowSpan,
  ...rest
}) => (
  <Card
    className="fact-container fact-card"
    {...rest}
    style={{
      // @ts-expect-error
      '--fact-grid-col-span': colSpan,
      '--fact-grid-row-span': rowSpan,
    }}
  >
    <Card.Header className="fact-container__label fact-card__label">
      {label}
    </Card.Header>
    <Card.Body className="fact-container__output fact-card__output">
      {output}
    </Card.Body>
  </Card>
);
