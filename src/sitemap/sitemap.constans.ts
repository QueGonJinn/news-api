import { NewsCategory } from 'src/page/page.model';

type routeMapType = Record<NewsCategory, string>;

export const CATEGORY_URL: routeMapType = {
  0: '/technologies',
  1: '/entertainment',
  2: '/society',
  3: '/health',
  4: '/travel',
  5: '/celebrities',
};
