import {index, route, type RouteConfig} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('pages/:handle', 'routes/page.tsx'),
  route('search/tires', 'routes/search.tires.tsx'),
] satisfies RouteConfig;
