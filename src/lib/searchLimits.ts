const VISITOR_SEARCH_LIMIT = 5;
const STORAGE_KEY = "adalcci_visitor_searches";

interface VisitorSearchData {
  count: number;
  lastReset: string;
}

export const getVisitorSearchCount = (): number => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return 0;
    
    const parsed: VisitorSearchData = JSON.parse(data);
    
    // Reset count if it's been more than 24 hours
    const lastReset = new Date(parsed.lastReset);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff >= 24) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        count: 0,
        lastReset: now.toISOString(),
      }));
      return 0;
    }
    
    return parsed.count;
  } catch {
    return 0;
  }
};

export const incrementVisitorSearchCount = (): number => {
  const currentCount = getVisitorSearchCount();
  const newCount = currentCount + 1;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    count: newCount,
    lastReset: localStorage.getItem(STORAGE_KEY) 
      ? JSON.parse(localStorage.getItem(STORAGE_KEY)!).lastReset 
      : new Date().toISOString(),
  }));
  
  return newCount;
};

export const getRemainingSearches = (): number => {
  const used = getVisitorSearchCount();
  return Math.max(0, VISITOR_SEARCH_LIMIT - used);
};

export const canVisitorSearch = (): boolean => {
  return getVisitorSearchCount() < VISITOR_SEARCH_LIMIT;
};

export const VISITOR_SEARCH_LIMIT_VALUE = VISITOR_SEARCH_LIMIT;
