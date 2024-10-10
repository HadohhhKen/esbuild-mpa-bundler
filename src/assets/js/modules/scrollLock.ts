let scrollPosition = 0;

const scrollLock = () => {
  scrollPosition = window.scrollY;
  document.body.style.overflow = 'hidden';
};

const scrollUnlock = () => {
  document.body.style.overflow = '';
  window.scrollTo(0, scrollPosition);
};

export { scrollLock, scrollUnlock };
