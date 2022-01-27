export default function decorate($block) {
  // add some classes according to structure
  $block.querySelectorAll(':scope p').forEach(($p, i) => {
    if (i === 0) {
      $p.classList.add('deck');
    }
  });
}
