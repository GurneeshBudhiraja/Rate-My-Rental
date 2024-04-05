import { Client, Storage,Query,ID } from "appwrite";
import keys from "../../keys/keys";
class Bucket{
  client=new Client();
  storage;
  constructor(){
    this.storage=new Storage(this.client);
    this.client
    .setEndpoint(keys.appwriteEndpoint)
    .setEndpoint(keys.appwriteProjectId);
  }

  addFile({id=ID.unique(),file}){
    return this.storage.createFile(keys.appwriteBucketId,id,file)
  }
  
}




const storage = new Bucket();
export default storage