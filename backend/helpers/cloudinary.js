const cloudinary=require('cloudinary').v2;
const multer=require('multer');

cloudinary.config({
    cloud_name:'dpittaip0',
    api_key:"135248974483188",
    api_secret:"HjRsIDZtZ4aLBYLxdWaxa03EzKQ"
})

const storage=new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result=await cloudinary.uploader.upload(file, {
        resource_type:'auto'
    })

    return result;
}

const upload =multer({storage});
module.exports={upload,imageUploadUtil}