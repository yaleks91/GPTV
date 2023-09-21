import OpenAIApi  from 'openai'
import config from 'config'
import { createReadStream } from 'fs'


class OpenAI {

  constructor() {
    this.openai = new OpenAIApi({
      apiKey : config.get('OPENAI_KEY')
    })
  }

  async transcription(filepath) {
    try{
        const responce = await this.openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that transcribes audio.',
            },
            {
              role: 'user',
              content: createReadStream(filepath)
            },
          ],
          model: 'whisper-1',
        });

        return responce.choices[0].message.content;
    } catch(e){ console.log('Error whele transcribing', e) }
  }
}

const openai = new OpenAI({apiKey:config.get('OPENAI_KEY')})

export default openai
