const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

//Node x Amazon
const aws = require('aws-sdk')

//Multer x Amazon
const multers3 = require('multer-s3')

//Here we'll have 2 "modes"
//We can use local, so multer will save files inset uploads folder
//It can be use while developing
const storageTypes = {
    //So this is the "local" mode to use while developing
    local: multer.diskStorage({
        //Where files go after upload
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..','..','tmp','uploads'))
        },
        //Here we can generate the filename that will be used to store the file
        filename: (req, file, callback) => {
            //'16' aleatory bytes
            crypto.randomBytes(16, (err, hash) => {
                //When error while generating random bytes, callback error....
                if(err) callback(err)
                
                //When OK, create the filename string
                file.key = `${hash.toString('hex')}-${file.originalname}`
                callback(null, file.key)

            })
        }
    }),
    //This is the "s3 amazon" mode to production use
    s3: multers3({
        s3: new aws.S3(),
        //Bucket name inside S3
        bucket: 'uploadexample2',
        //If we dont define this contentType, when the use access the file, the browser will try to download it
        //But what we want is to OPEN and not to Download
        //multers3.AUTO_CONTENT_TYPE will hold the current file type
        contentType: multers3.AUTO_CONTENT_TYPE,
        //ACL => Permission
        acl: 'public-read',
        key: (req, file, callback) => {
            //'16' aleatory bytes
            crypto.randomBytes(16, (err, hash) => {
                //When error while generating random bytes, callback error....
                if(err) callback(err)
                
                //When OK, create the filename string
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                callback(null, fileName)

            })
        }
    })
}

module.exports = {
    //Where files go after upload (when destination is not defined)
    dest: path.resolve(__dirname, '..','..','tmp','uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE], //CHANGE BETWEEN PRODUCTION AND TEST HERE
    //restrictions: only 2mb, only 5 files...
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    //req = req.body (express)
    //file = file name, file type ...
    //callback = function to run after verifications
    fileFilter: (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjped',
            'image/png'
        ];

        //Check if file type is allowd
        if(allowedMimes.includes(file.mimetype)) {
            //first callback parameter reserved for errors, if ok return null
            //second callback parameter could be some data or just true when success
            callback(null, true);
        } else {
            callback(new Error('Invalid file type.'))
        }
    }
}