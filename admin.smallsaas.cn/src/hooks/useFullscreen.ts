import { useState } from 'react';

/**
 * 使用全屏功能
 */
const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const enterFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (
      'mozRequestFullScreen' in element &&
      typeof element.mozRequestFullScreen === 'function'
    ) {
      element.mozRequestFullScreen();
    } else if (
      'webkitRequestFullscreen' in element &&
      typeof element.webkitRequestFullscreen === 'function'
    ) {
      element.webkitRequestFullscreen();
    } else if (
      'msRequestFullscreen' in element &&
      typeof element.msRequestFullscreen === 'function'
    ) {
      element.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (
      'mozCancelFullScreen' in document &&
      typeof document.mozCancelFullScreen === 'function'
    ) {
      document.mozCancelFullScreen();
    } else if (
      'webkitExitFullscreen' in document &&
      typeof document.webkitExitFullscreen === 'function'
    ) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if ('msExitFullscreen' in document && typeof document.msExitFullscreen === 'function') {
      // IE/Edge
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = (element: HTMLElement | null) => {
    if (!element) return; // 防止空引用
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen(element);
    }
  };

  return [isFullscreen, toggleFullscreen] as const;
};

export default useFullscreen;
