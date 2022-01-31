export default function decorate($block) {
  const $parent = $block.parentNode;
  if ($parent.classList.contains('section-wrapper')) {
    $block.remove();
    $parent.prepend($block);
    $parent.remove();
  }
}
