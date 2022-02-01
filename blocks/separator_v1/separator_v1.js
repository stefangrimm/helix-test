export default function decorate($block) {
  // hr markdown gets removed, so let's add it again
  $block.appendChild(document.createElement('hr'));
}
