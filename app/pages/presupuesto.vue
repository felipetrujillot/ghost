<script setup lang="ts">
/**
 *
 */
const items = [
  {
    item: 'Licencia anual Apple developer',
    costo: '99 USD',
  },

  {
    item: 'Licencia única Google developer',
    costo: '25 USD',
  },
  {
    item: 'Total',
    costo: '124 USD',
  },
]

const images = [
  '/screen_1.png',
  '/screen_2.png',
  '/screen_3.png',
  '/screen_4.png',
  '/screen_5.png',
]
</script>

<template>
  <!-- <div class="container-sm">
    <img
      src="https://images.pexels.com/photos/8423051/pexels-photo-8423051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  </div> -->
  <div class="container-sm py-10 space-y-4">
    <div class="my-16">&nbsp;</div>
    <div class="my-16">&nbsp;</div>
    <div class="my-16">&nbsp;</div>

    <div class="flex justify-center">
      <!--  <img
        class="w-48"
        src="https://storage.googleapis.com/linebox-bucket/590663081915.jpeg"
      /> -->
      <!--   <img
        src="https://images.pexels.com/photos/249360/pexels-photo-249360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      /> -->
    </div>

    <div class="my-16">&nbsp;</div>

    <div class="w-3/4 mx-auto">
      <h1
        class="leading text-center text-4xl md:text-6xl tracking-tight font-bold fadeIn"
      >
        Educación Vial
      </h1>

      <h2 class="text-center text-primary font-bold text-2xl mt-4">
        Propuesta APP
      </h2>
    </div>
    <div class="my-16">&nbsp;</div>
    <div class="my-16">&nbsp;</div>
    <div class="my-16">&nbsp;</div>
    <div class="my-16">&nbsp;</div>
    <div class="my-16">&nbsp;</div>

    <div class="text-center">
      <a href="https://educacionvial.cl" class="text-primary" target="_blank"
        >educacionvial.cl</a
      >
      <p>Fecha: 21 de Diciembre del 2024</p>

      <p>©2024 Linebox SPA. Todos los derechos reservados.</p>
    </div>
    <div class="page-break-before"></div>

    <div>
      <h1 class="text-primary font-bold text-3xl">
        Prototipo de diseño - Pantallas principales
      </h1>
      <h2 class="text-lg font-medium">
        Usar fondos más coloridos en vez de blanco da una mejor impresión de
        videojuego.
      </h2>
      <h2 class="text-lg font-medium">
        Consideramos añadir el logo y link de educacionvial para que sirva como
        publicidad
      </h2>
    </div>

    <div class="flex gap-4">
      <img :src="images[0]" width="200" />
      <img :src="images[1]" width="200" />
      <img :src="images[4]" width="200" />
    </div>

    <div class="page-break-before"></div>

    <div>
      <h1 class="text-primary font-bold text-3xl">Prototipo de diseño</h1>

      <h2 class="text-lg font-medium">
        La ventaja de un celular es que es posible scrollear hacia abajo para
        más información, por lo que podemos dejar más espacio entre cada ítem,
        para agregar un mejor diseño
      </h2>
    </div>
    <div class="flex gap-4">
      <img :src="images[2]" width="200" />
      <img :src="images[3]" width="200" />
    </div>

    <div class="page-break-before"></div>

    <h1 class="text-primary font-bold text-3xl">
      Factibilidad de funcionalidades
    </h1>

    <div class="flex gap-2">
      <VueCheck :status="true" />
      <h2 class="text-lg font-medium">
        Menú con señales por categoría, y descripción + vídeo
      </h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="true" />
      <h2 class="text-lg font-medium">Juego 1: Señales</h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="false" />
      <h2 class="text-lg font-medium">Juego 2: Por definir</h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="false" />
      <h2 class="text-lg font-medium">Juego 3: Por definir</h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="true" />
      <h2 class="text-lg font-medium">Funcionalidad de inicio de sesión</h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="true" />
      <h2 class="text-lg font-medium">
        Sistema de enviar invitaciones a la app
      </h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="true" />
      <h2 class="text-lg font-medium">Sistema de puntajes y ranking</h2>
    </div>

    <div class="flex gap-2">
      <VueCheck :status="true" />
      <h2 class="text-lg font-medium">
        Señales y vídeos existentes en educacionvial.cl
      </h2>
    </div>

    <h1 class="text-primary font-bold text-3xl">Estimaciones</h1>

    <h2 class="font-bold text-xl">Pantallas principales</h2>
    <div class="ps-4">
      <ul class="list-disc">
        <li class="text-lg font-medium">Login</li>
        <li class="text-lg font-medium">
          Inicio (selección de menús y juegos)
        </li>
        <li class="text-lg font-medium">Señales de tránsito</li>
        <li class="text-lg font-medium">Juego 1: Identifica las señales</li>
        <li class="text-lg font-medium">Juego 2: Por definir</li>
        <li class="text-lg font-medium">Juego 3: Por definir</li>
      </ul>
    </div>

    <h2 class="font-bold text-xl">Pantallas secundarias</h2>

    <div class="ps-4">
      <ul class="list-disc">
        <li class="text-lg font-medium">Puntuaciones</li>
        <li class="text-lg font-medium">Recuperar contraseña</li>
        <li class="text-lg font-medium">Términos y condiciones</li>
      </ul>
    </div>

    <h2 class="font-bold text-xl">Panel de administración</h2>

    <div class="ps-4">
      <ul class="list-disc">
        <li class="text-lg font-medium">Mantenedor de usuarios</li>
        <li class="text-lg font-medium">Reset de contraseñas</li>
        <li class="text-lg font-medium">Modificar señales de juego</li>
      </ul>
    </div>

    <h1 class="text-primary font-bold text-3xl">Observaciones</h1>

    <div>
      <div class="space-y-2">
        <h2 class="text-xl font-medium">
          Lanzar una App desde cero implica obtener la aprobación en las
          tiendas. En el caso de Apple es más lento el proceso, por experiencia
          he visto que toma semanas.
        </h2>
        <h2 class="text-xl font-medium">
          Recomiendo lanzar una versión inicial con la cantidad mínima de
          funcionalidades. Después ir agregando el resto en actualizaciones.
          Para poder pasar más rápido el proceso con Apple.
        </h2>

        <h2 class="text-xl font-medium">
          Estimo aproximadamente 02 meses para tener la primera versión
          funcional disponible para descargar.
        </h2>
      </div>
    </div>

    <!-- TECNOLOGIAS -->
    <div class="page-break-before"></div>

    <h1 class="text-primary font-bold text-3xl">Tecnologías relevantes</h1>

    <div>
      <div class="space-y-2">
        <h2 class="text-xl font-medium">
          Todas las tecnologías que utilizaremos para el desarrollo son estándar
          en la industria del desarrollo en 2024, son open source y no tienen
          costo alguno en licencias.
        </h2>
        <h2 class="text-xl font-medium">
          <span class="font-bold text-primary">React Native</span> es la
          principal tecnología que utilizaremos para el desarrollo de la
          aplicación. Permite utilizar un sólo código para las plataformas de
          iOS y Android, utilizando componentes nativos en ambas plataformas.
          Esto permite que las aplicaciones se sientan nativas.
        </h2>

        <h2 class="text-xl font-medium">
          <span class="font-bold text-primary">Expo</span> es un entorno de
          desarrollo que facilita el despliegue de versiones de desarrollo y
          paso a producción en App Store y Play Store.
        </h2>

        <h2 class="text-xl font-medium">
          <span class="font-bold text-primary">MySQL</span> es una base de datos
          relacional que utilizaremos para mantener los usuarios, sistema de
          puntaje, etc.
        </h2>

        <h2 class="text-xl font-medium">
          <span class="font-bold text-primary">Typescript</span> es el lenguaje
          de programación principal que se utilizará en todo el proyecto.
        </h2>

        <h2 class="text-xl font-medium">
          <span class="font-bold text-primary">Node</span> es un entorno de
          ejecución para el lenguaje Typescript, se encarga de todo lo
          relacionado con el servidor, API, conexión con base de datos. Además
          de mantener el versionamiento de la APP.
        </h2>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <img
          src="https://cdn.worldvectorlogo.com/logos/react-native-1.svg"
          width="200"
        />
        <img
          src="https://miro.medium.com/v2/resize:fit:476/1*GJH5UaZjAV8Ql_vZcmMy-Q.png"
          width="200"
        />

        <img
          src="https://cdn.freebiesupply.com/logos/large/2x/mysql-5-logo-png-transparent.png"
          width="200"
        />

        <img
          src="https://www.adm.ee/wordpress/wp-content/uploads/2023/12/javascript_and_typescript-1.jpg"
          width="200"
        />

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
          width="200"
        />
      </div>
    </div>

    <div class="page-break-before"></div>
    <!-- TECNOLOGIAS -->

    <!-- COSTOS -->

    <h1 class="text-primary font-bold text-3xl">Costos</h1>

    <h2 class="font-medium text-lg">
      Para lanzar una aplicación desde cero se requiere pagar unos costos a
      Apple y Google, en el caso de Apple es un pago anual, Google es un pago
      único.
    </h2>

    <Table class="border border-primary border-2">
      <TableHeader>
        <TableRow class="border border-primary border-2">
          <TableHead class="text-lg border border-primary border-2">
            Item
          </TableHead>
          <TableHead class="text-end text-lg border border-primary border-2">
            Costo USD</TableHead
          >
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="i in items">
          <TableCell
            class="font-medium text-lg font-medium border border-primary border-2"
            >{{ i.item }}</TableCell
          >
          <TableCell
            class="text-end font-medium text-lg font-medium border border-primary border-2"
            >{{ i.costo }}</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>

    <h1 class="text-primary font-bold text-3xl">Costos Infraestructura</h1>

    <h2 class="font-medium text-lg">
      Necesitaremos un servidor, recomiendo usar Google Cloud, debido a que
      cuentan con servidores en Chile, eso mejora las latencias, y tengo
      entendido que también puedes generar facturas con ellos.
    </h2>

    <Table class="border border-primary border-2">
      <TableHeader>
        <TableRow class="border border-primary border-2">
          <TableHead class="text-lg border border-primary border-2">
            Item
          </TableHead>
          <TableHead class="text-end text-lg border border-primary border-2">
            Costo USD Mensual</TableHead
          >
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow class="border border-primary border-2">
          <TableCell
            class="font-medium text-lg font-medium border border-primary border-2"
            >Servidor 1 CPU 4 Gb RAM</TableCell
          >
          <TableCell
            class="text-end font-medium text-lg font-medium border border-primary border-2"
            >40 USD</TableCell
          >
        </TableRow>
      </TableBody>
    </Table>
    <div class="page-break-before"></div>

    <h1 class="text-primary font-bold text-3xl">Presupuesto</h1>

    <h2 class="text-xl">Incluye todo lo considerado en reuniones.</h2>

    <Table class="border border-primary border-2">
      <TableHeader>
        <TableRow>
          <TableHead class="text-lg border border-primary border-2">
            Item
          </TableHead>
          <TableHead class="text-center text-lg border border-primary border-2">
            Costo Pesos</TableHead
          >
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell class="border border-primary border-2">
            <div class="ps-4">
              <ul class="list-disc">
                <li class="text-lg font-medium">
                  Diseño de pantallas principales
                </li>

                <li class="text-lg font-medium">
                  Visualización de señales + vídeos
                </li>
                <li class="text-lg font-medium">Desarrollo de aplicación</li>
                <li class="text-lg font-medium">Juego 1</li>
                <li class="text-lg font-medium">Juego 2</li>
                <li class="text-lg font-medium">Juego 3</li>
                <li class="text-lg font-medium">
                  Sistema de puntajes y ranking
                </li>
                <li class="text-lg font-medium">Invitación</li>
                <li class="text-lg font-medium">Panel web de administrador</li>
                <li class="text-lg font-medium">Despliegue de servidor</li>
                <li class="text-lg font-medium">
                  Despliegue en App Store y Play Store
                </li>
              </ul>
            </div>
          </TableCell>

          <TableCell class="border border-primary border-2">
            <h1 class="font-bold text-center text-xl text-primary">
              {{ clpFormat(1000000) }}
            </h1>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <h2 class="text-xl">
      Agregar más funcionalidades o juegos requeriría diseño, desarrollo y
      lanzamiento como actualización.
    </h2>

    <Table class="border border-primary border-2">
      <TableHeader>
        <TableRow>
          <TableHead class="text-lg border border-primary border-2">
            Item
          </TableHead>
          <TableHead class="text-center text-lg border border-primary border-2">
            Costo Pesos</TableHead
          >
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell class="border border-primary border-2">
            <div class="ps-4">
              <ul class="list-disc">
                <li class="text-lg font-medium">
                  Diseño interfaz nuevo juego/funcionalidad
                </li>
                <li class="text-lg font-medium">Desarrollo del juego</li>
                <li class="text-lg font-medium">
                  Mantenedor en el panel de administrador
                </li>
              </ul>
            </div>
          </TableCell>

          <TableCell class="border border-primary border-2">
            <h1 class="font-bold text-center text-xl text-primary">
              {{ clpFormat(150000) }} - {{ clpFormat(200000) }}
            </h1>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="page-break-before"></div>

    <!-- COSTOS -->
  </div>
</template>

<style>
/* Add a page break before an element */
.page-break-before {
  break-before: page; /* Modern */
  page-break-before: always; /* Fallback for older browsers */
}
</style>
