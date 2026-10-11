import {legacyPages} from '../legacy-pages';

export default function Home() {
  return <main dangerouslySetInnerHTML={{__html: legacyPages.home}} />;
}
