import { ModeEnum } from '@src/core/enums/mode.enum';
import { getEmptyStateStyle } from '../utils/styles';

type EmptyStateProps = {
  mode: ModeEnum;
};

export const EmptyState = ({ mode }: EmptyStateProps) => {
  return <div style={getEmptyStateStyle()}>No scores recorded for {mode} mode yet.</div>;
};
