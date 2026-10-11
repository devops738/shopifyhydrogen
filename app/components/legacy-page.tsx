import {useEffect, useRef} from 'react';

/**
 * The Online Store pages contain their own scoped CSS and client-side
 * controllers. React intentionally does not execute scripts supplied through
 * dangerouslySetInnerHTML, so recreate them after hydration. This preserves
 * the live site's UI while its data and controllers are progressively moved
 * into native Hydrogen components.
 */
export function LegacyPage({html, sectionId}: {html: string; sectionId: string}) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = mount.current;
    if (!root) return;
    const scripts = Array.from(root.querySelectorAll('script'));
    for (const original of scripts) {
      const replacement = document.createElement('script');
      for (const attribute of Array.from(original.attributes)) replacement.setAttribute(attribute.name, attribute.value);
      replacement.text = original.textContent ?? '';
      original.replaceWith(replacement);
    }
  }, [html]);

  return <main id={sectionId} ref={mount} dangerouslySetInnerHTML={{__html: html}} />;
}
