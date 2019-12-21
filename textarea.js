const textAreaResize = (textArea) => {
  textArea.style.height = 'auto'
  textArea.style.height = textArea.scrollHeight + 2 + "px"
}