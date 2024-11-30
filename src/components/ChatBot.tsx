import ChatBot, { Params } from 'react-chatbotify'
import { useState } from 'react'
import { chat } from '../gemini'

const MyChatBot = () => {
  const [hasError, setHasError] = useState(false)

  const gemini_stream = async (params: Params) => {
    try {
      const result = await chat.sendMessage(params.userInput)
      console.log(result.response.text())
      return result.response.text()
    } catch {
      await params.injectMessage('Có lỗi xảy ra, vui lòng reload website và thử lại!')
      setHasError(true)
    }
  }
  const flow = {
    start: {
      message: 'Bạn cần tôi giúp gì ko?',
      path: 'loop',
    },
    loop: {
      message: async (params: Params) => {
        const text = await gemini_stream(params)
        return text
      },
      path: () => {
        if (hasError) {
          return 'start'
        }
        return 'loop'
      },
    },
  }

  return (
    <ChatBot
      settings={{
        general: { showFooter: false },
        header: { title: 'Trợ lý AI' },
        audio: { disabled: true },
        notification: { disabled: true },
        tooltip: {
          mode: 'NEVER',
        },
        chatHistory: { storageKey: 'example_real_time_stream' },
        botBubble: { simStream: true },
      }}
      flow={flow}
    />
  )
}
export default MyChatBot
