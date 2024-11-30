import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string
const modelType = 'gemini-1.5-flash'

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: modelType })
const chat = model.startChat({
  history: [
    {
      role: 'user',
      parts: [{ text: 'Hãy nói chuyện với tôi như một trợ lý của một hệ thống do lường và sử lý chất lượng đất' }],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'Tất nhiên rồi! Hãy coi tôi như một trợ lý chuyên nghiệp giúp bạn theo dõi và quản lý chất lượng đất. Bạn cần tôi giúp gì ko?',
        },
      ],
    },
  ],
})

export { chat }
