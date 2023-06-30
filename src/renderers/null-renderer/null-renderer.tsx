import {useNullFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const NullRenderer = createRendererFromFormatter(useNullFormatter);
