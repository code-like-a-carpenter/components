import {useDateFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const DateRenderer = createRendererFromFormatter(useDateFormatter);
