import { Client, Storage, ID } from "appwrite";
import keys from "../../keys/keys.js";
class Bucket{
    client = new Client();
    storage;
    constructor(){
        this.client.setEndpoint("https://cloud.appwrite.io/v1/")
        .setProject(keys.appwriteProjectId);
        this.storage = new Storage(this.client);
    }
    async uploadFile(file){
        try {
            return await this.storage.createFile(keys.appwriteBucketId,ID.unique(),file);
        } catch (error) {
            throw error
        }
    }
    async getFile({id}){
        try {
            return await this.storage.getFile(keys.appwriteBucketId,id)
        } catch (error) {
            throw error
        }
    }
    async deleteFile({id}){
        try {
            return await this.storage.deleteFile(keys.appwriteBucketId,id)
        } catch (error) {
            throw error;
        }
    }
}
const bucket = new Bucket();
export default bucket;