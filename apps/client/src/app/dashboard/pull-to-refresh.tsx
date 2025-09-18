import PullToRefresh from 'react-simple-pull-to-refresh';

export default function RefreshWrapper({
  children,
  onRefresh,
}: {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}) {
  return <PullToRefresh onRefresh={onRefresh}>{children}</PullToRefresh>;
}
