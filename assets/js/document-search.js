(() => {
  const input = document.getElementById('docSearch');
  const article = document.querySelector('article');
  if (!input || !article) return;
  const original = article.innerHTML;
  input.addEventListener('input', () => {
    const q = input.value.trim();
    article.innerHTML = original;
    if (!q) return;
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safe, 'gi');
    nodes.forEach(node => {
      if (!node.nodeValue || !regex.test(node.nodeValue)) return;
      regex.lastIndex = 0;
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, m => `<mark class="search-hit">${m}</mark>`);
      node.parentNode.replaceChild(span, node);
    });
    const first = article.querySelector('mark.search-hit');
    if (first) first.scrollIntoView({behavior:'smooth',block:'center'});
  });
})();
