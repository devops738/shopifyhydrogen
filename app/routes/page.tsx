import {useParams} from 'react-router';
import {legacyPages} from '../legacy-pages';
import {LegacyPage} from '../components/legacy-page';

export default function LegacyPageRoute() {
  const {handle = ''} = useParams();
  const fallback = handle.startsWith('promotion-') ? 'promotion-detail' : handle.startsWith('coupon-') ? 'coupon-detail' : '';
  const html = legacyPages[handle] ?? legacyPages[fallback];
  if (!html) return <main className="not-found"><h1>Page not found</h1><p>This page has not yet been imported into the Hydrogen storefront.</p></main>;
  return <LegacyPage sectionId={`shopify-section-main-page-${handle}`} html={html} />;
}
