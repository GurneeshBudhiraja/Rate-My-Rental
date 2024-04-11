import { Client, Storage, Query } from "appwrite";
import keys from "../../keys/keys";
class Bucket {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(keys.appwriteEndpoint) // Your API Endpoint
      .setProject(keys.appwriteProjectId); // Your project ID
    this.storage = new Storage(this.client);
  }

  addFile({ id, file }) {
    return this.storage.createFile(keys.appwriteBucketId, id, file);
  }
    getFilePreview({fileId, width = 500, height = 500}){
      return this.storage.getFilePreview(keys.appwriteBucketId,fileId,height,width);
    }
    getFileView(fileID){
      return this.storage.getFileView(keys.appwriteBucketId,fileID)
    }

    deleteFile(fileId){
      return this.storage.deleteFile(keys.appwriteBucketId,fileId);
    }
  }

const storage = new Bucket();
export default storage;
