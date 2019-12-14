const copyForWhatsapp = (divForCopy) => {
  let range = new Range()

  let clonedText = document.createElement('textarea')
  clonedText.className = 'buffer'
  document.body.append(clonedText)

  let newTextLine = '' //* одна строчка скопированного текста
  let textBlocks = divForCopy.childNodes
  
  textBlocks.forEach(child => {
    let textLines = child.childNodes
    textLines.forEach(text => {
      range.selectNodeContents(text)
      range.cloneContents()
      newTextLine = range.commonAncestorContainer.textContent
      if (range.commonAncestorContainer.classList.contains('teamName')) {
        clonedText.innerHTML += `\n*${newTextLine.toUpperCase()}*\n`
      } else {
        clonedText.innerHTML += `${newTextLine}\n`
      }
    })
  })

  clonedText.innerHTML = clonedText.innerHTML.slice(1)
  
  let focus = document.activeElement
  clonedText.focus() //* Устанавливаем фокус на текст
  clonedText.select()
  document.execCommand('copy');
  document.getSelection().removeAllRanges()
  clonedText.remove()
  focus.focus() //* Возвращаем фокус
}
