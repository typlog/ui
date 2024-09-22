
export const keyframes = {
  overlayShow: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  contentUpAndShow: {
    from: { opacity: '0', transform: 'translateY(25%)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  slideDownAndFadeIn: {
    from: { opacity: '0', transform: 'translateY(-0.5rem)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  slideDownAndFadeOut: {
    from: { opacity: '1', transform: 'translateY(0)' },
    to: { opacity: '0', transform: 'translateY(-0.5rem)' },
  },
  slideLeftAndFadeIn: {
    from: { opacity: '0', transform: 'translateX(0.5rem)' },
    to: { opacity: '1', transform: 'translateX(0)' },
  },
  slideUpAndFadeIn: {
    from: { opacity: '0', transform: 'translateY(0.5rem)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
  slideUpAndFadeOut: {
    from: { opacity: '1', transform: 'translateY(0)' },
    to: { opacity: '0', transform: 'translateY(0.5rem)' },
  },
  slideRightAndFadeIn: {
    from: { opacity: '0', transform: 'translateX(-0.5rem)' },
    to: { opacity: '1', transform: 'translateX(0)' },
  },
  slideDown: {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  slideUp: {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
  enterFromRight: {
    from: { opacity: '0', transform: 'translateX(200px)' },
    to: { opacity: '1', transform: 'translateX(0)' },
  },
  enterFromLeft: {
    from: { opacity: '0', transform: 'translateX(-200px)' },
    to: { opacity: '1', transform: 'translateX(0)' },
  },
  exitToRight: {
    from: { opacity: '1', transform: 'translateX(0)' },
    to: { opacity: '0', transform: 'translateX(200px)' },
  },
  exitToLeft: {
    from: { opacity: '1', transform: 'translateX(0)' },
    to: { opacity: '0', transform: 'translateX(-200px)' },
  },
  scaleIn: {
    from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
    to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
  },
  scaleOut: {
    from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
    to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
  },
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  hide: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideIn: {
    from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
    to: { transform: 'translateX(0)' },
  },
  swipeOut: {
    from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
    to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
  },
}

export const animation = {
  overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  contentUpAndShow: 'contentUpAndShow 150ms',
  slideDownAndFadeIn: 'slideDownAndFadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  slideDownAndFadeOut: 'slideDownAndFadeOut 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  slideLeftAndFadeIn: 'slideLeftAndFadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  slideUpAndFadeIn: 'slideUpAndFadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  slideUpAndFadeOut: 'slideUpAndFadeOut 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  slideRightAndFadeIn: 'slideRightAndFadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  scaleIn: 'scaleIn 200ms ease',
  scaleOut: 'scaleOut 200ms ease',
  fadeIn: 'fadeIn 200ms ease',
  fadeOut: 'fadeOut 200ms ease',
  enterFromLeft: 'enterFromLeft 250ms ease',
  enterFromRight: 'enterFromRight 250ms ease',
  exitToLeft: 'exitToLeft 250ms ease',
  exitToRight: 'exitToRight 250ms ease',
  hide: 'hide 100ms ease-in',
  slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  swipeOut: 'swipeOut 100ms ease-out',
}
