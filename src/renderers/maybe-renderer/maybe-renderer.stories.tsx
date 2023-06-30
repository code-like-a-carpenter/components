import {Description, DescriptionList} from '../../description';
import {BooleanRenderer} from '../boolean-renderer';
import {CurrencyRenderer} from '../currency-renderer';
import {DateRenderer} from '../date-renderer';

import {maybeRender, MaybeRenderer, useMaybeRender} from './maybe-renderer';

export default {
  component: MaybeRenderer,
  title: 'Renderers/MaybeRenderer',
};

export const Default = () => (
  <MaybeRenderer value={null} Component={BooleanRenderer} />
);

export const Truthy = () => (
  <MaybeRenderer value={true} Component={BooleanRenderer} />
);

export const Falsy = () => (
  <MaybeRenderer value={false} Component={BooleanRenderer} />
);

export const PassThroughProps = () => (
  <MaybeRenderer Component={CurrencyRenderer} value={17} currency="GBP" />
);

const MaybeDate = maybeRender(DateRenderer);

export const BoundMaybeRenderer = () => (
  <DescriptionList>
    <Description term={'Null'} description={null} Renderer={MaybeDate} />
    <Description
      term={'Undefined'}
      description={undefined}
      Renderer={MaybeDate}
    />
    <Description
      term={'With a Value'}
      description={new Date('2023-01-01')}
      Renderer={MaybeDate}
    />
  </DescriptionList>
);

export const BoundMaybeRendererViaHook = () => {
  const MaybeBoolean = useMaybeRender(BooleanRenderer);
  return (
    <DescriptionList>
      <Description term={'Null'} description={null} Renderer={MaybeBoolean} />
      <Description
        term={'Undefined'}
        description={undefined}
        Renderer={MaybeBoolean}
      />
      <Description
        term={'With a Value'}
        description={true}
        Renderer={MaybeBoolean}
      />
    </DescriptionList>
  );
};
