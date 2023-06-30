import {useRelativeDateFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const RelativeDateRenderer = createRendererFromFormatter(
  useRelativeDateFormatter
);
