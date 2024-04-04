import { Client, Databases, ID } from "appwrite";
import keys from "../../keys/keys"

class Database {
    client=new Client();
    databases;
    constructor(){
        this.client
        .setEndpoint(keys.appwriteEndpoint)
        .setProject(keys.appwriteProjectId)
        this.databases=new Databases(this.client);
    }
    submitContact(data){
        return this.databases.createDocument(keys.appwriteDatabaseId,keys.appwriteContactCollectionId,ID.unique(),data);
    }
    
}


const contact = new Database();
export default contact;