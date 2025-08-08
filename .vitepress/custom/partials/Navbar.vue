<template>
  <div id="navbar" class="z-30 fixed lg:sticky top-0 w-full">
    <div id="navbar-backdrop" class="absolute w-full h-full backdrop-blur border-b border-gray-a3"></div>
    <div class="mx-auto max-w-content relative">
      <slot></slot>
    </div>
  </div>
</template>

<style>
#navbar-backdrop {
  backdrop-filter: blur(12px);
  position: absolute;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--gray-a4);
  background-color: var(--background-dropback);
}
</style>
