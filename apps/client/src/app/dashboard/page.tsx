'use client';

import { ContentStream } from '@/components/songs/ContentStream';
import RefreshWrapper from './pull-to-refresh';

export default function DashboardHome() {
  return (
    <RefreshWrapper onRefresh={() => Promise.resolve()}>
      <ContentStream />
    </RefreshWrapper>
  );
}
