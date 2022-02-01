export default function decorate($block) {
  $block.querySelectorAll(':scope a').forEach(($a) => {
    $a.classList.add('pinterest');
    $a.appendChild(document.createTextNode('Save'));
  });
}
