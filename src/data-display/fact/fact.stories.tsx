import {useContext} from 'react';
import {Card} from 'react-bootstrap';

import {CurrencyRenderer} from '../../renderers/currency-renderer';

import {FactContext} from './context';
import {Fact} from './fact';
import {FactContainer} from './types';

export default {
  component: Fact,
  title: 'Data Display/Fact',
};

export const bigNumber = () => (
  <Fact label="Population of San Francisco" value={815000} />
);

export const word = () => <Fact label={'Status'} value={'COMPLETE'} />;

export const currency = () => (
  <Fact label={'Monthly Price'} value={9.99} Renderer={CurrencyRenderer} />
);

const FooterFactCard: FactContainer = ({label, output}) => (
  <Card className="fact-container fact-card">
    <Card.Body className="fact-card__value">{output}</Card.Body>
    <Card.Footer className="fact-card__label">{label}</Card.Footer>
  </Card>
);

export const AlternateContainer = () => {
  const defaults = useContext(FactContext);
  return (
    <FactContext.Provider value={{...defaults, Container: FooterFactCard}}>
      <Fact label={'Monthly Price'} value={9.99} Renderer={CurrencyRenderer} />
    </FactContext.Provider>
  );
};
