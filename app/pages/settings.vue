<script setup lang="ts">
documentTitle('Configuraciones')
const theme = useCookie('theme')

/**
 *
 */
const themeRef = ref(theme.value || 'light')

/**
 *
 */
const changeTheme = (themeVal: 'dark' | 'light') => {
  if (themeVal === 'light') {
    document.body.classList.remove('dark')
  }
  if (themeVal === 'dark') {
    document.body.classList.add('dark')
  }
  theme.value = themeVal
}
</script>

<template>
  <AdminNavbar />

  <div class="flex min-h-screen w-full flex-col">
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <div class="mx-auto grid w-full max-w-6xl gap-2">
        <h1 class="text-3xl font-semibold">Configuraciones</h1>
      </div>
      <div
        class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
      >
        <nav class="grid gap-4 text-sm text-muted-foreground">
          <a href="#" class="font-semibold text-primary"> General </a>
          <a href="#"> Security </a>
          <a href="#"> Integrations </a>
          <a href="#"> Support </a>
          <a href="#"> Organizations </a>
        </nav>
        <div class="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Name</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Store Name" />
              </form>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Plugins Directory</CardTitle>
              <CardDescription>
                The directory within your project, in which your plugins are
                located.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form class="flex flex-col gap-4">
                <div class="space-y-4">
                  <Label>Tema</Label>
                  <RadioGroup :default-value="themeRef!">
                    <div class="flex items-center space-x-2">
                      <RadioGroupItem
                        value="light"
                        @click.prevent="changeTheme('light')"
                      />
                      <Label class="cursor-pointer text-sm" for="r1">Día</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroupItem
                        value="dark"
                        @click.prevent="changeTheme('dark')"
                      />
                      <Label class="cursor-pointer text-sm" for="r2"
                        >Noche</Label
                      >
                    </div>
                  </RadioGroup>
                </div>

                <!-- <Input
                  placeholder="Project Name"
                  default-value="/content/plugins"
                />
                <div class="flex items-center space-x-2">
                  <Checkbox id="include" default-checked />
                  <label
                    for="include"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow administrators to change the directory.
                  </label>
                </div> -->
              </form>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>
