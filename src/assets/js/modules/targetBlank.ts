const targetBlank = () => {
  document.querySelectorAll('a').forEach((item) => {
    if (item.href.startsWith('https')) {
      item.target = '_blank';
      item.rel = 'noopener';
    }
  });
};

export default targetBlank;
