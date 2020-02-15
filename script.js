// TODO: split into multiple <mark> when selection is spread across multiple
// elements (if someone actually finds this tool useful)

function redacted() {
  /** @param {Range} range */
  function addMark(range) {
    const el = range.commonAncestorContainer.parentElement.closest(
      'del.redacted'
    );
    if (el) {
      let parent = el.parentNode;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
      return;
    }

    const marker = document.createElement('del');
    marker.classList.add('redacted');
    range.surroundContents(marker);
    marker.style.color = marker.parentElement.style.color;
  }

  function redact() {
    const selection = document.getSelection();
    if (selection.type !== 'Range') return;
    const range = selection.getRangeAt(0);
    addMark(range);
  }

  document.head.insertAdjacentHTML(
    'beforeend',
    '<style>.redacted { background: currentColor; }</style>'
  );
  document.addEventListener('mouseup', redact);
}

const src = `(${redacted})();`;
document.getElementById('bookmarklet').href = `javascript:${src}`;
redacted();

document.querySelectorAll('.el').forEach((el, i) => {
  el.classList.remove('el');
  el.innerHTML = `<span class="el">${el.innerHTML}</span>`; // ugly, but works
  el.style.setProperty('--n', i + 1);
});
