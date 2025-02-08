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

  const res = await $trpc.usuarios.loginApi.mutate(data)

  const maxAge = 3600 * 24 * 365

  if (res.status === 'ok') {
    const token = useCookie('token', {
      maxAge,
    })

    token.value = res.token

    const nombre = useCookie('nombre', {
      maxAge,
    })

    nombre.value = res.usuario_db.nombre

    $router.push('/')
    return
  }
  return toast('warning', res.data)
}
</script>

<template>
  <div
    class="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div
      class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <!--  <div class="absolute inset-0 bg-zinc-900">
        <img
          class="absolute top-0 w-full max-h-screen left-0"
          src="/midjourney.png"
          style="opacity: 0.7"
        />
      </div> -->
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
      </div>
    </div>
  </div>
</template>
