import OpenAI from "openai";
import config from 'config'

const openai = new OpenAI( {apiKey : config.get("OPENAI_KEY")} );



export default async function main(textMessage) {
    const completion = await openai.chat.completions.create({
        messages: [{
                "role": "user",
                "content": textMessage
            }
        ],
        model: "gpt-3.5-turbo",
    });
    console.log('message to GPT has been sent')
    return completion.choices[0];
};