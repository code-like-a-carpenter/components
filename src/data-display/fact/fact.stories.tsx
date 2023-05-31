import assert from 'assert';

import {useContext} from 'react';
import {Card} from 'react-bootstrap';

import {CurrencyRenderer} from '../../renderers';
import {Gauge, GaugeProps} from '../gauge/gauge';

import {FactContext} from './context';
import {Fact} from './fact';
import {FactContainer} from './types';

export default {
  component: Fact,
  title: 'Data Display/Fact',
};

export const BigNumber = () => (
  <Fact label="Population of San Francisco" value={815000} />
);

export const Word = () => <Fact label="Status" value="COMPLETE" />;

export const Currency = () => (
  <Fact
    label="Monthly Price"
    value={9.99}
    Renderer={CurrencyRenderer}
    currency="GBP"
  />
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
      <Fact
        label="Monthly Price"
        value={9.99}
        Renderer={CurrencyRenderer}
        currency="GBP"
      />
    </FactContext.Provider>
  );
};

/**
 * Take a look at the code for this story, because it's a bit more complicated
 * than you would expect. For some reason, the type-checker falls apart if the
 * Renderer has required props (if all props except `value` are optional, it
 * behaves as expected; if any are required, it expects exactly a
 * ComponentType<RendererProps<T>> and can't tell that, in this case, min and
 * max have been provided.
 *
 * The adapter in the story code demonstrates one way to get close, but let's
 * face it, you're just going to use @ts-expect-error.
 */
export const AsGauge = () => {
  interface GaugeAdapterProps extends Partial<GaugeProps> {
    value: number;
  }

  const GaugeAdapter = ({max, min, ...rest}: GaugeAdapterProps) => {
    assert(
      typeof max === 'number',
      "If you're seeing this, it's typescript didn't warn you that `max` is actually required. For reasons I have yet to work out, making `max` required completely breaks its integration with the Fact component"
    );
    assert(
      typeof min === 'number',
      "If you're seeing this, it's typescript didn't warn you that `min` is actually required. For reasons I have yet to work out, making `min` required completely breaks its integration with the Fact component"
    );
    return <Gauge max={max} min={min} {...rest} />;
  };

  return (
    <>
      <Fact
        label="Usage"
        Renderer={GaugeAdapter}
        min={0}
        max={100}
        value={75}
        valueRendererProps={{style: 'unit', unit: 'kilobyte'}}
      />
      {/*This next chunk is just here to illustrate the type error*/}
      <div style={{display: 'none'}}>
        {/* @ts-expect-error */}
        <Fact label="Usage" Renderer={Gauge} min={0} max={100} value={75} />
      </div>
    </>
  );
};
