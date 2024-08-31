import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

require('dotenv').config();
import { Storage } from '@google-cloud/storage';
import { ErrorRes } from '../models/res_entity';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const client = new GoogleAIFileManager('AIzaSyBN9AcJCza-XDQ6zhOwwEtdS00cbkJH1jw');
const genAI = new GoogleGenerativeAI('AIzaSyBN9AcJCza-XDQ6zhOwwEtdS00cbkJH1jw');

export async function getValue(image: string): Promise<{value: number} | ErrorRes>{

    
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
          });
        /* const imageBuffer = Buffer.from(image.replace(/^data:image\/w+;base64,/, ''), 'base64');

        const guid = uuid.v4();
        const fileName = `${guid}.jpg`;
        const filePath = path.join(__dirname, fileName);

        fs.writeFileSync(filePath, imageBuffer); */

        
        const uploadResponse = await client.uploadFile("E:\\Projetos\\Shopper\\src\\datasource\\jetpack.jpg", {
            mimeType: "image/jpeg",
            displayName: 'test',
        });
        
        const result = await model.generateContent([
            {
              fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri
              }
            },
            { text: "Describe the numbers on the image" },
          ]);
        
        console.log(result.response.text())
        return {value: 0};
    } catch (error) {
        return {error_code:'', error_description: (error as Error).message};
    }
    
}

/* const imageBuffer = Buffer.from(image.replace(/^data:image\/w+;base64,/, ''), 'base64');

try {
    const [result] = await client.textDetection({image: {content: imageBuffer}});

    const text = result.textAnnotations || [];

    const numbersString: string[] = text.flatMap(
        (item: { description: string; })=> item.description?.match(/\b\d+\b/g) || [])
        .filter((value: any,index: any,self: string | any[])=>self.indexOf(value) === index);

    const combined:string = numbersString.join('');
    const combinedNumber = parseFloat(combined);

    return {value: combinedNumber};

} catch (e) {
    return {error_code:'', error_description: ''};
} */
export async function createLinkForImage(image: string): Promise<{url: string, imageGuid: string} | ErrorRes>{
    try{
        const storageClient = new Storage();
        const imageBuffer = Buffer.from(image.replace(/^data:image\/w+;base64,/, ''), 'base64');

        const guid = uuid.v4();
        const fileName = `${guid}.jpg`;
        const filePath = path.join(__dirname, fileName);

        fs.writeFileSync(filePath, imageBuffer);
        const bucket = storageClient.bucket('storage98765');
        const file = bucket.file(fileName);
        await file.save(imageBuffer, {contentType: 'image/jpg'});

        await file.makePublic();

        const imageUrl = `https://storage.googleleapis.com/images/${fileName}`;
        return {url: imageUrl, imageGuid: guid};

    }catch(e){
        return {error_code:'', error_description: ''};
    }
}