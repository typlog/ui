<template>
  <div class="flex items-center justify-between h-12 py-4 px-5 lg:hidden border-t border-gray-a3">
    <div class="flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3">
      <button class="inline-flex items-center gap-2 p-1" aria-label="Menu" aria-controls="doc-sidebar">
        <MenuIcon />
        <span class="inline md:hidden">Menu</span>
      </button>
    </div>
    <div class="flex items-center">
      <button class="js-menu flex items-center gap-1 text-sm" aria-expanded="false" aria-controls="doc-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M8 6h10" />
          <path d="M6 12h9" />
          <path d="M11 18h7" />
        </svg>
        <span class="font-medium text-gray-11">On this page</span>
      </button>
    </div>
  </div>
</template>
