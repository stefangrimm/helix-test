function htmlEncode(text) {
  return text.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function yamlDecode(encoded) {
  return encoded.replace(/&quot;/g, '"');
}

function process(data, comp) {
  const content = data.data.content;
  if (content && content.length) {
    let html = '';
    for (let i = 0; i < content.length; i += 1) {
      const item = content[i];
      const innerContent = item.properties.data;
      if (innerContent && innerContent.title) {
        html += `\n<li>${htmlEncode(innerContent.title)}</li>`;
      }
    }
    if (html.length) {
      comp.innerHTML = `<ul>${html}\n</ul>`;
    } else {
      comp.innerText = 'No valid data received';
    }
  } else {
    comp.innerText = 'No data received';
  }
}

export default function decorate(block) {
  const endpoint = block.getAttribute('data-endpoint');
  const query = yamlDecode(block.getAttribute('data-query'));

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `query=${encodeURIComponent(query)}`,
  }).then((response) => {
    const contentType = response.headers.get('Content-Type');
    if ((response.status === 200) && (contentType === 'application/json')) {
      block.innerText = 'Content fetched.';
      response.json().then((json) => {
        process(json, block);
      });
    } else {
      block.innerText = 'Error fetching remote content.';
    }
  });
}
