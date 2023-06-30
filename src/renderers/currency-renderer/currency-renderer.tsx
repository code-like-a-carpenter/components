import {useCurrencyFormatter} from '../../formatters';
import {createRendererFromFormatter} from '../create-renderer-from-formatter';

export const CurrencyRenderer =
  createRendererFromFormatter(useCurrencyFormatter);
