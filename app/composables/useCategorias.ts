/**
 *
 * @param categorias
 *
 * @returns
 */
export const useCategorias = <T extends string[]>(categorias: T) => {
  type CategoriaSeleccionada = (typeof categorias)[number]

  const categoriaSeleccionada = ref<CategoriaSeleccionada>(categorias[0]!)

  return { categoriaSeleccionada, categorias }
}
