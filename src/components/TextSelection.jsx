import React from 'react'

const normalizeText = (text) => {
  return text.replace(/\s+/g, ' ')
}

const sentence = '099MJKL23170fwYJ/TRF//FRM BLESSING DICK UDOH TO IFEGWU BR'

const TextSelection = () => {
  const highlightColor = '#ffe184'
  //   const [highlightColor, setHighlightColor] = useState('#ffe184')

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      highlightSelection(selection)
    }
  }

  const highlightSelection = (selection) => {
    const range = selection.getRangeAt(0)

    const span = document.createElement('span')
    span.style.backgroundColor = highlightColor
    span.className = 'selected'

    const closeButton = document.createElement('span')
    closeButton.className = 'close-icon'
    closeButton.textContent = 'X'
    closeButton.onclick = handleDeselection

    span.appendChild(document.createTextNode(range.toString()))
    span.appendChild(closeButton)

    range.deleteContents()
    range.insertNode(span)

    window.getSelection().removeAllRanges()
  }

  const handleDeselection = (e) => {
    const selectedText = e.target.parentElement
    const textNode = document.createTextNode(
      selectedText.textContent.replace('X', '')
    )
    selectedText.parentElement.replaceChild(textNode, selectedText)
  }

  return (
    <div>
      <p onMouseUp={handleTextSelection}>
        {normalizeText(sentence)
          .split(' ')
          .map((word, index) => (
            <span key={index}>{word} </span>
          ))}
      </p>
      <style>
        {`
          .highlighted-text {
            position: relative;
          }

          .close-icon {
            position: absolute;
            top: -1px;
            right: 0;
            padding: 2px 4px;
            background-color: #fff;
            border: 1px solid #ccc;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
          }

          .highlighted-text:hover .close-icon {
            opacity: 1;
          }
        `}
      </style>
    </div>
  )
}

export default TextSelection
