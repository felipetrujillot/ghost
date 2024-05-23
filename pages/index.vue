<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()
definePageMeta({
  middleware: 'rootauth',
})
/**
 *
 */
const formData = ref({
  email: '',
  password: '',
})

/**
 *
 */
const newLogin = async () => {
  if (
    isEmail(formData.value.email) == false ||
    formData.value.email.length == 0
  )
    return toast('warning', 'Debes ingresar tu email')
  if (formData.value.password.length == 0)
    return toast('warning', 'Debes ingresar una contraseña')

  const data = {
    email: formData.value.email,
    password: formData.value.password,
  }

  const res = await $trpc.user.loginApi.mutate(data)

  const maxAge = 3600 * 24 * 365

  if (res.status === 'ok') {
    const token = useCookie('token', {
      maxAge,
    })
    token.value = res.token

    const name = useCookie('name', {
      maxAge,
    })

    name.value = res.usuario_db.name

    if (res.usuario_db.role === 0) {
      $router.push('/admin')
      return
    }
  }
  return toast('warning', res.data)
}
</script>

<template>
  <div
    class="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <a
      href="/examples/authentication"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8"
    >
      Todo
    </a>
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <div class="absolute inset-0 bg-zinc-900">
        <img
          class="absolute top-0 w-full max-h-screen left-0"
          src="/midjourney.png"
          style="opacity: 0.7"
        />
      </div>
      <div class="relative z-20 flex items-center text-lg font-medium">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path
            d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
          ></path>
        </svg> -->
        TITLE
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <footer class="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
          <p class="text-sm text-muted-foreground">
            Ingresa tu email para iniciar sesión
          </p>
        </div>
        <div class="grid gap-6">
          <form>
            <div class="grid gap-2">
              <div class="grid gap-1">
                <Input
                  v-model="formData.email"
                  placeholder="name@example.com"
                  type="email"
                  auto-capitalize="none"
                  auto-complete="email"
                  auto-correct="off"
                />
              </div>

              <div class="grid gap-1">
                <Input
                  v-model="formData.password"
                  placeholder="******"
                  type="password"
                  auto-capitalize="none"
                  auto-complete="email"
                  auto-correct="off"
                />
              </div>
              <Button @click.prevent="newLogin">
                <!---->
                Iniciar Sesión
              </Button>
            </div>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span
                class="bg-background px-2 text-muted-foreground cursor-pointer"
              >
                Olvidé mi contraseña
              </span>
            </div>
          </div>
        </div>
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  </div>
  <!--  <ImageThumbnail /> -->

  <div class="relative min-h-screen lg:grid-cols-2 lg:px-0 py-16">
    <div class="container h-full">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <Card class="p-0 relative h-full pb-10 pt-24">
          <img
            class="absolute rounded-md h-full w-full top-0 left-0"
            src="https://storage.googleapis.com/hubdesign-repositorio/qa/public/uploads/1695236954129-pexelsphoto3183183.jpeg"
            style="opacity: 0.7"
          />
          <div class="relative">
            <div class="m-10 mb-16 space-y-6">
              <h1 class="font-bold text-3xl">Lorem Ipsum</h1>
              <p class="text-lg">
                “This library has saved me countless hours of work and helped me
                deliver stunning designs to my clients faster than ever before.”
              </p>
            </div>
          </div>
        </Card>

        <Card class="p-0 relative h-full pb-10 pt-24">
          <img
            class="absolute rounded-md h-full w-full top-0 left-0"
            src="https://storage.googleapis.com/hubdesign-repositorio/qa/public/uploads/1695236972908-1683129310565.jpg"
            style="opacity: 0.4"
          />
          <div class="relative">
            <div class="m-10 mb-16 space-y-6">
              <h1 class="font-bold text-3xl">Lorem Ipsum</h1>
              <p class="text-lg">
                “This library has saved me countless hours of work and helped me
                deliver stunning designs to my clients faster than ever before.”
              </p>
            </div>
          </div>
        </Card>

        <Card class="p-0 relative h-full pb-10 pt-24">
          <img
            class="absolute rounded-md h-full w-full top-0 left-0"
            src="/midjourney.png"
            style="opacity: 0.7"
          />
          <div class="relative">
            <div class="m-10 mb-16 space-y-6">
              <h1 class="font-bold text-3xl">Lorem Ipsum</h1>
              <p class="text-lg">
                “This library has saved me countless hours of work and helped me
                deliver stunning designs to my clients faster than ever before.”
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <LandingCarousel />
</template>
