import {useParams} from 'react-router';
import {legacyPages} from '../legacy-pages';

export default function LegacyPageRoute() {
  const {handle = ''} = useParams();
  const fallback = handle.startsWith('promotion-') ? 'promotion-detail' : handle.startsWith('coupon-') ? 'coupon-detail' : '';
  const html = legacyPages[handle] ?? legacyPages[fallback];
  if (!html) return <main className="not-found"><h1>Page not found</h1><p>This page has not yet been imported into the Hydrogen storefront.</p></main>;
  return <main dangerouslySetInnerHTML={{__html: html}} />;
}
