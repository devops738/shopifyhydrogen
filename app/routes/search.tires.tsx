import {legacyPages} from '../legacy-pages';

export function meta() { return [{title: 'Tire Search | American Tire Stores'}]; }

export default function TireSearchRoute() {
  return <main dangerouslySetInnerHTML={{__html: legacyPages['tire-search']}} />;
}
