/**
 *
 */
export const useDocsPdf = () => {
  const pdfScroll = ref<HTMLDivElement>()
  const source = ref<ArrayBuffer>()
  const selectedFilename = ref('')
  const originalFilename = ref('')
  const statusDoc = ref<'pending' | 'success'>('pending')
  const metadata = ref()

  /**
   *
   * @param pageNumber
   */
  const scrollTo = (pageNumber: number) => {
    if (pageNumber <= 1) return

    let paginaLevel = document.getElementById('paginaLevel')

    if (!paginaLevel) {
      paginaLevel = document.getElementById('paginaZoomLevel')
    }

    paginaLevel!.scrollTop = 0

    const canvas = document.getElementsByClassName('metadataLayer')
    const clientHeight = canvas[0]!.clientHeight * (pageNumber - 1)

    console.log(paginaLevel)
    console.log(clientHeight)
    paginaLevel!.scrollTop = clientHeight
  }

  return {
    source,
    statusDoc,
    metadata,
    selectedFilename,
    pdfScroll,
    originalFilename,
    scrollTo,
  }
}
