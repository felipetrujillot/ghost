<script setup lang="ts">
import { ClipboardCopy } from 'lucide-vue-next'
const { $trpc } = useNuxtApp()

documentTitle('RFP')
definePageMeta({
  layout: 'admin-layout',
})

const tabs = ref('resumen')
</script>

<template>
  <div class="w-full container-sm ml-auto mr-auto">
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">RFP</h1>
      <p class="text-muted-foreground">Detalle de tu RFP</p>

      <div class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 align-stretch">
          <Card>
            <h1 class="font-bold">RFP Empresa Mandante S.A</h1>
            <h2>77.777.77-7</h2>
            <p class="text-muted-foreground">Fecha: 06-05-2024, 12:20</p>
          </Card>

          <Card>
            <h1>Mis documentos</h1>
            <p class="text-sm text-muted-foreground">
              Recuerda que estos documentos son confidenciales
            </p>
            <div class="flex gap-2">
              <Input
                disabled
                placeholder="https://google.cl"
                model-value="https://storage.googleapis.com/hubdesign-repositorio/pdf/sdwan/SdResumenFinanciero_1710440936644.pdf"
              />

              <Button @click.prevent="toast('ok', 'TODO')">
                <ClipboardCopy :size="20" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Tabs default-value="resumen" v-model="tabs">
        <TabsList>
          <TabsTrigger value="resumen"> Resumen </TabsTrigger>
          <TabsTrigger value="chat"> Chat IA </TabsTrigger>
        </TabsList>
        <TabsContent value="resumen"> </TabsContent>
        <TabsContent value="chat"> </TabsContent>
      </Tabs>

      <Card v-if="tabs === 'chat'">
        <div
          class="relative flex h-full min-h-[50vh] flex-col p-4 lg:col-span-2"
        >
          <div class="flex justify-between items-center mb-3">
            <h1>AI Model</h1>
            <div
              class="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground absolute right-3 top-3"
            >
              Output
            </div>
          </div>
          <div class="flex-1"></div>
          <form
            class="relative overflow-hidden bg-muted/50 border rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <div class="space-y-4 p-4">
              <div
                class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted"
              >
                Hi, how can I help you today?
              </div>
              <div
                class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground"
              >
                Hey, I'm having trouble with my account.
              </div>
              <div
                class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted"
              >
                What seems to be the problem?
              </div>
              <div
                class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground"
              >
                I can't log in.
              </div>
            </div>

            <Textarea
              class="flex w-full rounded-md rounded-b-none border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              id="message"
              placeholder="Ingresa tu consulta sobre el documento..."
            ></Textarea>

            <div class="flex items-center p-3 pt-0 bg-background">
              <Button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 ml-auto gap-1.5"
                type="submit"
              >
                Enviar Mensaje
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-corner-down-left-icon size-3.5"
                >
                  <polyline points="9 10 4 15 9 20"></polyline>
                  <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                </svg>
              </Button>
            </div>
          </form>
        </div>
      </Card>

      <template v-if="tabs === 'resumen'">
        <Card>
          <h1 class="text-xl font-bold">¿Cuál es el Alcance del Proyecto?</h1>
          <p>
            La carta del proveedor describe servicios en dos áreas principales:
            "Gestión de Alertas y Notificaciones ante Incidentes" y
            "ADMINISTRACION". En la primera, se menciona la gestión de alertas y
            log de seguridad, revisión de variables de salud, reportes de
            monitoreo bajo demanda y tareas de seguridad relacionadas. En
            "ADMINISTRACION" se ofrece servicio 5x8, mantención preventiva,
            control de cambios, gestión de vulnerabilidades y parches,
            configuraciones y reportes de seguridad. Los alcances específicos no
            se detallan, pero se incluye gestión continua de seguridad,
            mantenimiento, actualizaciones y reportes.
          </p>
        </Card>

        <Card>
          <h1 class="text-xl font-bold">
            ¿Cuál es el presupuesto inicial y/o costos que hace referencia al
            documento para implementar la solución?
          </h1>

          <p>
            La clausula de confidencialidad no proporciona información sobre el
            presupuesto inicial o los costos rel acionados con la implementación
            de la solución Fortinet FortiClient VPN/ZTNA mencionada en el
            documento. El texto solo reitera la obligación de mantener la
            información contenida en la cotización confidencial y sin divulgarla
            a terceros hasta el momento en que se firme un contrato entre el
            cliente y Mandante S.A.
          </p>
        </Card>

        <Card>
          <h1 class="text-xl font-bold">
            ¿Qué plataformas y tecnologias especificas son necesarias para la
            implementación de la solución incluyendo hardware, software y
            herranientas de colaboración?
          </h1>

          <p>
            La solución necesita una variedad de plataformas y tecnologias
            especificas para su implenentación. Esto incluye hardware como
            servidores, dispositivos de seguridad y equipos admintstrados;
            software como plataformas de seguridad y herramientas de gestión; y
            herramientas de colaboración como sistemas de comunicaciones y
            gestión de tareas. Además, el equipo de soporte debe tener
            experiencia en la ejecución de actividades bajo detención ten prana
            del monitoreo de alertas de seguridad y notificaciones de fuentes
            externas, así como una gestió c y mejora continua de las plataformas
            de seguridad
          </p>
        </Card>
      </template>
    </div>
  </div>
</template>
