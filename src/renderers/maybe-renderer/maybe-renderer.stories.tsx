import {Description, DescriptionList} from '../../description';
import {BooleanRenderer} from '../boolean-renderer';
import {DateRenderer} from '../date-renderer';

import {maybeRender, MaybeRenderer, useMaybeRender} from './maybe-renderer';

export default {
  component: MaybeRenderer,
  title: 'Renderers/MaybeRenderer',
};

export const maybeRenderer = () => (
  <MaybeRenderer value={null} Component={BooleanRenderer} />
);

export const truthy = () => (
  <MaybeRenderer value={true} Component={BooleanRenderer} />
);

export const falsy = () => (
  <MaybeRenderer value={false} Component={BooleanRenderer} />
);

export const passThroughProps = () => (
  <MaybeRenderer
    Component={DateRenderer}
    value={null}
    relative
    negativeIsNull
  />
);

const MaybeDate = maybeRender(DateRenderer);

export const boundMaybeRenderer = () => (
  <DescriptionList>
    <Description term={'Null'}>
      <MaybeDate value={null} />
    </Description>
    <Description term={'Undefined'}>
      <MaybeDate value={undefined} />
    </Description>
    <Description term={'With a Value'}>
      <MaybeDate value={new Date('2023-01-01')} />
    </Description>
  </DescriptionList>
);

export const BoundMaybeRendererViaHook = () => {
  const MaybeBoolean = useMaybeRender(BooleanRenderer);
  return (
    <DescriptionList>
      <Description term={'Null'}>
        <MaybeBoolean value={null} />
      </Description>
      <Description term={'Undefined'}>
        <MaybeBoolean value={undefined} />
      </Description>
      <Description term={'With a Value'}>
        <MaybeBoolean value={true} />
      </Description>
    </DescriptionList>
  );
};
