const imagemin = require('imagemin');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant'); 

module.exports.compressImage=(pth)=>{
    console.log(pth);
        (async () => {
            const files = await imagemin([pth], {
                destination: 'public/uploads',
                plugins: [   
                    imageminMozjpeg({quality:50}),
                    imageminPngquant({
                        quality: [0.3,0.3]
                    })
                ]
            });
        })();
    }