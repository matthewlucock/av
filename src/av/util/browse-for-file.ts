export const browseForFile = (callback: (fileList: FileList) => void): void => {
  const input = document.createElement('input')
  input.type = 'file'

  input.oninput = () => {
    if (input.files !== null) callback(input.files)
  }

  input.click()
}
