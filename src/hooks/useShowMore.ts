
import { useState, useMemo } from 'react';

export const useShowMore = <T>(items: T[], initialCount: number = 6) => {
  const [showCount, setShowCount] = useState(initialCount);
  
  const visibleItems = useMemo(() => {
    return items.slice(0, showCount);
  }, [items, showCount]);
  
  const hasMore = showCount < items.length;
  const remainingCount = items.length - showCount;
  
  const showMore = () => {
    setShowCount(prev => Math.min(prev + initialCount, items.length));
  };
  
  const showAll = () => {
    setShowCount(items.length);
  };
  
  const reset = () => {
    setShowCount(initialCount);
  };
  
  return {
    visibleItems,
    hasMore,
    remainingCount,
    showMore,
    showAll,
    reset,
    totalCount: items.length,
    currentCount: showCount
  };
};
