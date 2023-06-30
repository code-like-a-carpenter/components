import {usePercentFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const PercentRenderer = createRendererFromFormatter(usePercentFormatter);
