const { MongoClient } = require('mongodb');
const AWS = require('aws-sdk');

class Utils {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        this.PUBLIC_BUCKET_NAME = 'MemoryAssist'; // Bucket with Sample Data **PUBLIC**
        this.ENDPOINT_URL = 'https://s3.us-east-005.backblazeb2.com';
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKenpy: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    async initClient() {
        await this.client.connect();
        this.db = this.client.db('MemoryAssist_db');
        this.records = this.db.collection('notes_images');
    }

    // given a param "name" for the image name, this method return a json object with the s3 url and associated tags
    async get_s3_and_tags(name) {
        if (!this.db) await this.initClient();

        const documents = await this.records.find({ name: name }).toArray();
        if (documents.length === 0) {
            return { error: 'Image not found' };
        }

        const s3Params = {
            Bucket: this.PUBLIC_BUCKET_NAME,
            Key: documents[0].filename,
        };

        const signedUrl = this.s3.getSignedUrl('getObject', s3Params);
        const tags = documents[0].tags;
        const result = { s3_url: signedUrl, tags: tags };
        return result;
    }

    // returns json objects of images that contain the tags specified in the parameters
    async get_matching_tags(tags) {
        if (!this.db) await this.initClient();

        const query = this.records.find({ tags: { $in: tags } });
        const rtn = await query.toArray();
        return rtn;
    } 
}

module.exports = Utils;