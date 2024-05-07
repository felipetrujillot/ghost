<template>
  <div>
    <AdminNavbar />
    <div
      class="bg-neutral-50 dark:bg-muted/40"
      style="min-height: calc(100vh - 4.1rem)"
    >
      <div class="container py-6 space-y-4">
        <slot />
      </div>
    </div>
  </div>
</template>
