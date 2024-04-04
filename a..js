const { ttdl } = require('btch-downloader');

async function downloadFacebookVideo() {
    const url = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226'
    try {
        const data = await ttdl(url);
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

downloadFacebookVideo();
