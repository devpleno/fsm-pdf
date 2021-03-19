const PdfPrinter = require('pdfmake')
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf'
  }
}

const express = require('express')
const app = express()

const printer = new PdfPrinter(fonts)

app.get('/get/:name', (req, res) => {
  const pdf = printer.createPdfKitDocument({
    content: 'Olá ' + req.params.name
  })
  // res.header('Content-disposition', 'inline; filename=meu-pdf.pdf')
  res.header('Content-disposition', 'attachment; filename=meu-pdf.pdf')
  res.header('Content-type', 'application/pdf')
  pdf.pipe(res)
  pdf.end()
})

app.listen(3000, () => console.log('pdf running...'))