import {useNumberFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const NumberRenderer = createRendererFromFormatter(useNumberFormatter);
