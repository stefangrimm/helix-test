import { readBlockConfig } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const usp = new URLSearchParams(window.location.search);
  const pipelineId = usp.get('hlx-pipeline-version');
  const queryStr = (pipelineId ? `?hlx-pipeline-version=${pipelineId}` : '');
  const resp = await fetch(`${footerPath}.plain.html${queryStr}`);
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;
  block.append(footer);
}
