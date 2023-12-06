//import OpenAIApi  from 'openai'
import config from 'config'
import AssemblyAI from 'assemblyai';
//import { createReadStream } from 'fs'


const client = new AssemblyAI({
  apiKey: config.get("ASSEMBLY_KEY"),
});





  const convertSpeechToText = async (pathToFile) => {
    console.log(pathToFile, typeof pathToFile);
    //const FILE_URL = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';
    const FILE_URL = 'https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3'

    const config = { 
      //audio_url: FILE_URL,
      audio_url: pathToFile,
      speaker_labels: false
    };

    const transcript = await client.transcripts.create(config);
    console.log('speechToToxt_l22:', pathToFile);
    return transcript.text;
  };

export default convertSpeechToText;






// class OpenAI {

//   constructor() {
//     this.openai = new OpenAIApi({
//       apiKey : config.get('OPENAI_KEY')
//     })
//   }

//   async transcription(filepath) {
//     try{
//         const responce = await this.openai.chat.completions.create({
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant that transcribes audio.',
//             },
//             {
//               role: 'user',
//               content: createReadStream(filepath)
//             },
//           ],
//           model: 'whisper-1',
//         });

//         return responce.choices[0].message.content;
//     } catch(e){ console.log('Error whele transcribing', e) }
//   }
// }

// const openai = new OpenAI({apiKey:config.get('OPENAI_KEY')})

// export default openai
