import axios from "axios"
import {createWriteStream} from "fs"
import {dirname, resolve} from "path"
import {fileURLToPath} from "url"
import ffmpeg from "fluent-ffmpeg"
import installer from "@ffmpeg-installer/ffmpeg"
import {unlink} from "fs/promises"

const __dirmane = dirname(fileURLToPath(import.meta.url))

export async function downloadOgg(url, filename){
    try{
        ffmpeg.setFfmpegPath(installer.path)
        const oggPath = resolve(__dirmane, '../media', `${filename}.oga`)
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        });
        return new Promise((resolve) => {
            const stream = createWriteStream(oggPath)
            response.data.pipe(stream)
            stream.on('finish', () => resolve(oggPath))
        })
    }catch(e){
        console.log('Error downloading', e.message)
    }

}

export async function toMp3(input, output) {
    try{
        const outputPath = resolve(dirname(input), `${output}.mp3`)
        return new Promise((resolve, reject) => {
            ffmpeg(input)
            .inputOption('-t 30')
            .output(outputPath)
            .on('end', () =>  {
                removeFile(input);
                resolve(outputPath);
            })
            .on('error', (err) => reject(err))
            .run()
        });
    } catch(e){
        console.log("Error when converting to mp3", e)
    };
}

export async function removeFile(path) {
    try {
        await unlink(path);
    } catch(e){
        console.log('Error when removing file', e);
    }
}