import {legacyPages} from '../legacy-pages';
import {LegacyPage} from '../components/legacy-page';

export function meta() { return [{title: 'Tire Search | American Tire Stores'}]; }

export default function TireSearchRoute() {
  return <LegacyPage sectionId="shopify-section-main-page-tire-search" html={legacyPages['tire-search']} />;
}
