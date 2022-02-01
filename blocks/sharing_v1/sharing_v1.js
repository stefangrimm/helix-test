export default function decorate($block) {
  $block.querySelectorAll(':scope a').forEach(($a) => {
    $a.classList.add('pinterest');
    const $counterSpan = document.createElement('span');
    $counterSpan.classList.add('pinterest-counter');
    $counterSpan.appendChild(document.createTextNode('0'));
    $a.appendChild($counterSpan);
    $a.appendChild(document.createTextNode('Save'));
  });
}
