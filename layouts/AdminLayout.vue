<template>
  <div>
    <div class="border-b">
      <div class="flex h-16 items-center container">
        <nav class="flex items-center space-x-4 lg:space-x-6">
          <NuxtLink
            to="/"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Overview
          </NuxtLink>

          <NuxtLink
            to="/"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Customers
          </NuxtLink>

          <NuxtLink
            to="/"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Customers
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center space-x-4">
          <Button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 outline-none relative h-8 w-8 rounded-full"
            id="radix-vue-dropdown-menu-trigger-784"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <span
              class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full h-8 w-8"
              ><img
                role="img"
                class="h-full w-full object-cover"
                alt="@shadcn"
                style=""
              /><!----></span
            >
          </Button>
        </div>
      </div>
    </div>

    <div class="container pt-6 space-y-4">
      <slot />
    </div>
  </div>
</template>
