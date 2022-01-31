export default function decorate($block) {
  const $parent = $block.parentNode;
  if ($parent.classList.contains('section-wrapper')) {
    $parent.removeChild($block);
    $parent.parentNode.insertBefore($block, $parent);
    $parent.parentNode.removeChild($parent);
  }
}
