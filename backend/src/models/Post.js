const mongoose = require('mongoose')
const aws = require('aws-sdk')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
    name: String, //Original filename
    size: Number,
    key: String, //Custom filename (with hash)
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//This middleware checks whether the URL is empty and populates it
//This "pre" use "this" to refer to model, so ehre we cannot use arrow function
PostSchema.pre('save', function () {
    if (!this.rul) {
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

//This is another middleware to delete phisycally from S3 or Local
PostSchema.pre('remove', function () {

    //Delete S3 (Production)
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: "YOUR BUCKET NAME",
            Key: this.key
        }).promise() //Turns into "promisse" so mongoose will wait until it completes, after mongoose delete it from database
    } else { //Else...Delete local (developing)
        
        return promisify(fs.unlink)( //This promisify is the same idea above, turns into promise
            path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
        )
    }
})

module.exports = mongoose.model("Post", PostSchema)