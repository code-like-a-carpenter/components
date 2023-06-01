import {BooleanRenderer} from '../boolean-renderer';
import {DateRenderer} from '../date-renderer';

import {MaybeRenderer} from './maybe-renderer';

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
  <MaybeRenderer
    Component={DateRenderer}
    value={null}
    relative
    negativeIsNull
  />
);
