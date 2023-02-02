const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})

const openAi = new OpenAIApi(configuration)

const generateImage = async (req, res) => {

    const { prompt, size, style } = req.body;
    let imageSize;
    if (size === 'small') {
        imageSize = '256x256'
    } else if (size == 'medium') {
        imageSize = '512x512'
    } else {
        imageSize = '1024x1024'
    }
    try {
        const response = await openAi.createImage({
            prompt,
            n: 1,
            size: imageSize
        });

        const imageUrl = response.data && response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        }
        res.status(400).json({
            success: false,
            error: `The image is not generated properly`
        })
    }
}

module.exports = { generateImage }