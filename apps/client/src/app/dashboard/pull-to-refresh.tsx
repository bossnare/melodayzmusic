import PullToRefresh from 'react-simple-pull-to-refresh'

export default function RefreshWrapper({children, onRefresh}: {children: React.ReactNode, onRefresh: () => Promise<void>}) {
  return (
    <PullToRefresh pullDownThreshold={80} resistance={2.5} onRefresh={onRefresh}>
      {children}
    </PullToRefresh>
  )
}
