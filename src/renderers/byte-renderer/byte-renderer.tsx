import {useByteFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const ByteRenderer = createRendererFromFormatter(useByteFormatter);
