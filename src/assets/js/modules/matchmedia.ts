const matchMedia = (
  minWidth: number = 768,
  matched?: () => void,
  unmatched?: () => void,
  init = true,
  changed?: () => void,
) => {
  const mediaQueryList = window.matchMedia(`(min-width: ${minWidth}px)`);
  const listener = (e: MediaQueryListEvent) => {
    changed?.();
    if (e.matches) {
      matched?.();
    } else {
      unmatched?.();
    }
  };
  mediaQueryList.addEventListener('change', listener);

  if (init) {
    listener({
      matches: mediaQueryList.matches,
      media: mediaQueryList.media,
    } as MediaQueryListEvent);
  }
};

export default matchMedia;
