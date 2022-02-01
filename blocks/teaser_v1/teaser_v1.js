function removeNode($node) {
  if ($node.parentNode) {
    $node.parentNode.removeChild($node);
  }
}

function moveChildNodes($src, $dest) {
  const children = $src.childNodes;
  for (let i = children.length - 1; i >= 0; i -= 1) {
    const $toMove = children[i];
    removeNode($toMove);
    $dest.insertBefore($toMove, $dest.firstChild);
  }
}

function replaceNode($src, $dest) {
  moveChildNodes($src, $dest);
  const $parent = $src.parentNode;
  if ($parent) {
    $parent.insertBefore($dest, $src);
    $parent.removeChild($src);
  }
}

function moveNode($src, $newParent, $insertBefore) {
  removeNode($src);
  if ($insertBefore) {
    $newParent.insertBefore($src, $insertBefore);
  } else {
    $newParent.appendChild($src);
  }
}

function childElements($el) {
  const childEls = [];
  $el.childNodes.forEach(($n) => {
    if ($n.nodeType === Node.ELEMENT_NODE) {
      childEls.push($n);
    }
  });
  return childEls;
}

function removeChildren($src) {
  while ($src.firstChild) {
    $src.removeChild($src.firstChild);
  }
}

export default function decorate($block) {
  const $imgDiv = document.createElement('div');
  $imgDiv.classList.add('teaser_v1-image');
  const $contentDiv = document.createElement('div');
  $contentDiv.classList.add('teaser_v1-content');
  $block.querySelectorAll(':scope img').forEach(($img) => {
    removeNode($img);
    $imgDiv.appendChild($img);
  });
  const children = childElements($block);
  const lastIndex = children.length - 1;
  const $descriptionDiv = document.createElement('div');
  let descriptionInserted = false;
  for (let i = lastIndex; i >= 0; i -= 1) {
    const $el = children[i];
    if (i === 0) {
      // pretitle
      const $pretitleDiv = document.createElement('div');
      $pretitleDiv.classList.add('deck');
      $pretitleDiv.classList.add('teaser_v1-content-pretitle');
      replaceNode($el, $pretitleDiv);
      moveNode($pretitleDiv, $contentDiv, $contentDiv.firstChild);
    } else if (i === lastIndex) {
      // actions
      const $actionDiv = document.createElement('div');
      $actionDiv.classList.add('teaser_v1-content-actions');
      replaceNode($el, $actionDiv);
      moveNode($actionDiv, $contentDiv);
    } else if ($el.tagName === 'H3') {
      // headline
      moveNode($el, $contentDiv, $contentDiv.firstChild);
    } else {
      // description
      if (!descriptionInserted) {
        descriptionInserted = true;
        $contentDiv.insertBefore($descriptionDiv, $contentDiv.firstChild);
      }
      moveNode($el, $descriptionDiv, $descriptionDiv.firstChild);
    }
  }
  removeChildren($block);
  $block.appendChild($imgDiv);
  $block.appendChild($contentDiv);
}
