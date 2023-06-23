import express, { response } from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';//open AI opi

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);
// We will sending prompt to api to generate the img
router.route('/').post(async(req,res)=> {
    try {
        const {prompt} = req.body;
        console.log("test:"+prompt);

        // sending data to api in obj form
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        console.log(aiResponse);

        //getting the data
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"})
    }
})

export default router;
