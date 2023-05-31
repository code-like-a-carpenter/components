import {BooleanRenderer} from '../boolean-renderer';
import {DateRenderer} from '../date-renderer';

import {MaybeRenderer} from './maybe-renderer';

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
