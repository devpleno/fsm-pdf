const PdfPrinter = require('pdfmake')

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf'
  }
}

const lines = []
lines.push([
  {
    text: 'Nome',
    style: 'header'
  },
  {
    text: 'E-mail',
    style: 'header'
  },
  {
    text: 'Situação',
    style: 'header'
  },
])
for (let i = 0; i < 300; i++) {
  let ativo = 'Ativo'
  if (i % 2 === 0) {
    ativo = { text: 'Inativo', style: 'inativo' }
  }
  lines.push(['Tulio Faria', 'tuliofaria@devpleno.com', ativo])
}

const printer = new PdfPrinter(fonts)
const docDefinition = {
  content: [
    {
      image: 'images/logo.png',
      // width: 100,
      // heigth: 100
      fit: [80, 100]
    },
    { text: 'Fullstack Master' },
    {
      table: {
        widths: ['*', '*', 100],
        body: lines
      }
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true
    },
    inativo: {
      fontSize: 18,
      bold: true
    }
  },
  footer: (page, pages) => {
    return {
      columns: [
        'Este documento é parte integrante do Fullstack Master',
        {
          alignment: 'right',
          text: [
            { text: page.toString(), italics: true },
            ' de ',
            { text: pages.toString(), italics: true }
          ]
        }
      ],
      margin: [40, 0]
    }
  }
}

const pdf = printer.createPdfKitDocument(docDefinition)
const fs = require('fs')
pdf.pipe(fs.createWriteStream('doc.pdf'))
pdf.end()

