import React, { useState } from 'react'
import { useAcceptLabel, useRejectLabel, useIgnoreLabel } from 'context/api'
import { useAppContext } from 'context'
import { useQuery } from '@tanstack/react-query'
import { client } from 'context/client'
import './home.css'

export const footerItems = [
  {
    id: 1,
    name: 'accept',
    icon: (
      <svg
        aria-hidden='true'
        fill='currentColor'
        width='40'
        height='40'
        viewBox='0 0 24 24'
        className='c01134'
        style={{ minWidth: '40px' }}
      >
        <path d='M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z'></path>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'reject',
    icon: (
      <svg
        aria-hidden='true'
        fill='currentColor'
        width='40'
        height='40'
        viewBox='0 0 24 24'
        className='c01134'
        style={{ minWidth: '40px' }}
      >
        <path d='M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z'></path>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'ignore',
    icon: (
      <svg
        aria-hidden='true'
        fill='currentColor'
        width='40'
        height='40'
        viewBox='0 0 24 24'
        className='c01134'
        style={{ minWidth: '40px' }}
      >
        <path d='M12 20.016c4.406 0 8.016-3.609 8.016-8.016 0-1.828-0.609-3.563-1.688-4.922l-11.25 11.25c1.359 1.078 3.094 1.688 4.922 1.688zM3.984 12c0 1.828 0.609 3.563 1.688 4.922l11.25-11.25c-1.359-1.078-3.094-1.688-4.922-1.688-4.406 0-8.016 3.609-8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z'></path>
      </svg>
    ),
  },
]

const Home = () => {
  const { setProgressInfo } = useAppContext()
  const [currentTab, setCurrentTab] = useState('person')
  const [selectedData, setSelectedData] = useState([])
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [selectedRanges, setSelectedRanges] = useState([])

  // const { data, isLoading } = useQuery(['label'], () =>
  //   client('label', { token: localStorage.getItem('token') }).then(
  //     (e) => e.data
  //   )
  // )

  const text = 'I am the data'
  // const text = data?.text

  const acceptLabelMutation = useAcceptLabel()
  const rejectLabelMutation = useRejectLabel()
  const ignoreLabelMutation = useIgnoreLabel()

  // if (isLoading) return <div>...loading</div>

  const tabs = [
    {
      id: 1,
      title: 'person',
      value: 'person',
    },
    {
      id: 2,
      title: 'org',
      value: 'org',
    },
  ]

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
  }

  const normalizeText = (text) => {
    return text.replace(/\s+/g, ' ')
  }

  //   const handleTextSelection = () => {
  //     const selection = window.getSelection()
  //     if (selection && selection.toString().length > 0) {
  //       const selectedText = selection.toString()
  //       setSelectedData((prevSelectedText) => [
  //         ...prevSelectedText,
  //         {
  //           text: selectedText,
  //           tab: currentTab,
  //         },
  //       ])
  //       highlightSelection(selection)
  //     }
  //   }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      // Get the current selected range
      const range = selection.getRangeAt(0)

      // Expand the selection to include the whole word
      range.expand('word')

      // Set the selection to the expanded range
      selection.removeAllRanges()
      selection.addRange(range)

      // Get the selected text
      const selectedText = selection.toString()

      setSelectedData((prevSelectedText) => [
        ...prevSelectedText,
        {
          text: selectedText,
          tab: currentTab,
        },
      ])

      // Highlight the selected text
      highlightSelection(selection)
    }
  }

  const highlightSelection = (selection) => {
    const updatedRanges = [...selectedRanges]

    const range = selection.getRangeAt(0)
    const container = document.createElement('span')
    container.className = 'selected-container'

    const span = document.createElement('span')
    span.className = 'selected'
    span.textContent = range.toString()

    const tabSpan = document.createElement('span')
    tabSpan.className = 'currentTab'
    tabSpan.textContent = currentTab

    const closeButton = document.createElement('span')
    closeButton.className = 'close-icon'
    closeButton.textContent = 'x'
    closeButton.onclick = () => handleDeselection(span)

    span.appendChild(tabSpan)
    span.appendChild(closeButton)

    container.appendChild(span)
    range.deleteContents()
    range.insertNode(container)

    setSelectedRanges((prevRanges) => [...prevRanges, updatedRanges])

    window.getSelection().removeAllRanges()
  }

  const handleDeselection = (selection) => {
    const selectedTextContent = selection.textContent
    const originalText = selectedTextContent.replace(currentTab, '').trim()
    const range = document.createRange()
    range.selectNode(selection.firstChild)
    const selectionContent = range.extractContents()
    selection.parentNode.replaceWith(selectionContent)

    setSelectedData((prevSelectedData) =>
      prevSelectedData.filter(
        (item) => item.text !== originalText || item.tab !== currentTab
      )
    )
  }

  // const goToNextSentence = () => {
  //   setCurrentSentenceIndex((prevIndex) =>
  //     prevIndex + 1 < Object.keys(data).length ? prevIndex + 1 : prevIndex
  //   )
  // }

  // const handleButtonClick = async (name) => {
  //   if (name === 'accept' || name === 'reject') {
  //     try {
  //       const entities = selectedData.map(({ text, tab }) => ({
  //         ent: tab,
  //         text,
  //       }))
  //       const { id } = data

  //       if (name === 'accept') {
  //         await acceptLabelMutation.mutateAsync({
  //           id,
  //           entities,
  //         })
  //         goToNextSentence()
  //       } else if (name === 'reject') {
  //         await rejectLabelMutation.mutateAsync({
  //           id: id,
  //           entities: entities,
  //         })
  //       }
  //       goToNextSentence()
  //       setSelectedData([])
  //       setProgressInfo((prevProgress) => ({
  //         ...prevProgress,
  //         acceptCount: prevProgress.acceptCount + (name === 'accept' ? 1 : 0),
  //         rejectCount: prevProgress.rejectCount + (name === 'reject' ? 1 : 0),
  //       }))
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   } else if (name === 'ignore') {
  //     const { id } = data

  //     try {
  //       const entities = selectedData.map(({ text, tab }) => ({
  //         ent: tab,
  //         text,
  //       }))
  //       await ignoreLabelMutation.mutateAsync({ id: id, entities })
  //       goToNextSentence()
  //       setSelectedData([])
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   }
  // }

  return (
    <>
      <div className='tabContainer'>
        <div className='tabWrapper'>
          <div className='tabHeader'>
            {tabs.map(({ id, title, value }) => {
              return (
                <span
                  key={id}
                  className={currentTab === value ? 'activeTab' : ''}
                  onClick={() => handleTabChange(value)}
                >
                  {title}
                  <span className='tabId'>{id}</span>
                </span>
              )
            })}
          </div>
          {/* display the texts from the API here */}
          <div className='demoContainer'>
            <div className='demoocontent'>
              <div className='demoWrapper'>
                <div className='demoContent' onMouseUp={handleTextSelection}>
                  <div className='selectWrapper'>
                    {normalizeText(text)
                      .split('-')
                      .map((word, index) => {
                        const isSelected = selectedRanges.some(
                          (range) =>
                            range.startOffset <= index &&
                            range.endOffset >= index
                        )

                        return (
                          <span
                            key={index}
                            onClick={() => handleDeselection(word)}
                            className={isSelected ? 'selected' : ''}
                          >
                            {word}
                          </span>
                        )
                      })}
                  </div>
                </div>
                {/* <span className='close-icon' onClick={handleDeselection}>
                  x
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='buttons'>
        {footerItems.map(({ id, icon, name }) => {
          let styles = {}
          if (name === 'accept') {
            styles = { backgroundColor: '#4fd364' }
          } else if (name === 'reject') {
            styles = { backgroundColor: '#f74c4a' }
          } else if (name === 'ignore') {
            styles = { backgroundColor: '#b9b9b9' }
          } else styles = { backgroundColor: '#b9b9b9' }
          return (
            <button
              key={id}
              // onClick={() => handleButtonClick(name)}
              style={styles}
            >
              {icon}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default Home
