<template>
  <span class="ui-SpinnerIcon">
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
    <span class="ui-SpinnerLeaf"></span>
  </span>
</template>

<style>
.ui-root {
  --spinner-animation-duration: 800ms;
  --spinner-opacity: 0.65;
}

.ui-SpinnerIcon {
  display: inline-block;
  position: relative;
  opacity: var(--spinner-opacity);
  vertical-align: middle;
  width: 1em;
  height: 1em;
  transform: scale(0.8334);
}

.ui-SpinnerLeaf {
  position: absolute;
  top: 0;
  left: calc(50% - 12.5% / 2);
  width: 12.5%;
  height: 100%;
  animation: ui-spinner-leaf-fade var(--spinner-animation-duration) linear infinite;
}

.ui-SpinnerLeaf::before {
  content: '';
  display: block;
  width: 100%;
  height: 30%;
  border-radius: var(--radius-1);
  background-color: currentColor;
}

.ui-SpinnerLeaf:where(:nth-child(1)) {
  transform: rotate(0deg);
  animation-delay: calc(-8 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(2)) {
  transform: rotate(45deg);
  animation-delay: calc(-7 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(3)) {
  transform: rotate(90deg);
  animation-delay: calc(-6 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(4)) {
  transform: rotate(135deg);
  animation-delay: calc(-5 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(5)) {
  transform: rotate(180deg);
  animation-delay: calc(-4 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(6)) {
  transform: rotate(225deg);
  animation-delay: calc(-3 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(7)) {
  transform: rotate(270deg);
  animation-delay: calc(-2 / 8 * var(--spinner-animation-duration));
}

.ui-SpinnerLeaf:where(:nth-child(8)) {
  transform: rotate(315deg);
  animation-delay: calc(-1 / 8 * var(--spinner-animation-duration));
}

@keyframes ui-spinner-leaf-fade {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.25;
  }
}
</style>
