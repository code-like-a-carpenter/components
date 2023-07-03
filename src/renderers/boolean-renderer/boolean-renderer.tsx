import {useBooleanFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const BooleanRenderer = createRendererFromFormatter(useBooleanFormatter);
