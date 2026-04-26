export async function downloadCertificate(filename: string): Promise<void> {
  const el = document.getElementById('certificate')
  if (!el) return

  // Dynamic import keeps html2canvas out of the SSR bundle
  const { default: html2canvas } = await import('html2canvas')

  const canvas = await html2canvas(el, {
    scale: 2,          // 2× resolution for shareable quality
    useCORS: true,
    backgroundColor: null,
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
