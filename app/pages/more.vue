<script setup lang="ts">
const md = `

$$
\frac{1}{\sqrt{2}}
$$

Esta expresión representa un número irracional, lo que significa que no se puede expresar como una fracción simple de dos enteros. Para simplificar esta expresión y eliminar la raíz cuadrada del denominador, se suele *racionalizar* la fracción. Esto se logra multiplicando tanto el numerador como el denominador por $$\sqrt{2}$$:

$$
\frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}
$$

Por lo tanto, la expresión $$\frac{1}{\sqrt{2}}$$ es equivalente a $$\frac{\sqrt{2}}{2}$$. Ambas representan el mismo valor numérico. El valor aproximado de esta expresión es alrededor de 0.7071.


\`\`\`ts
const a = 1;
\`\`\`

`

const { data: ast } = await useAsyncData('markdown', () => parseMarkdown(md))
</script>

<template>
  <!-- <Suspense>
    <MDCRenderer :body="ast.body" :data="ast.data" />
  </Suspense> -->
  <MDC :value="md" />
</template>
