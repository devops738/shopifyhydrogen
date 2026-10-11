import {legacyPages} from '../legacy-pages';
import {LegacyPage} from '../components/legacy-page';

export default function Home() {
  return <LegacyPage sectionId="shopify-section-main-index" html={legacyPages.home} />;
}
