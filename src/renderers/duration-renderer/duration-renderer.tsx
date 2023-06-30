import {useDurationFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const DurationRenderer =
  createRendererFromFormatter(useDurationFormatter);
