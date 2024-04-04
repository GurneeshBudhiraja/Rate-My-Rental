import { Client, Databases, ID} from "appwrite";
import keys from "../../keys/keys.js";
class Database{
    client = new Client();
    databases;
    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1/")
        .setProject(keys.appwriteProjectId)
        this.databases = new Databases(this.client);
    }
    async addDocument(props){
        try {
            return await this.databases.createDocument(keys.appwriteDatabaseId,keys.appwriteCollectionId,ID.unique(),JSON.stringify(props));
        } catch (error) {
            throw error
        }
    }
    async getDocument({id}){
        try {
            return await this.databases.getDocument(keys.appwriteDatabaseId,keys.appwriteCollectionId,id)
        } catch (error) {
            throw error
        }
    }
    async updateDocument({id,props}){
        try {
            return await this.databases.updateDocument(keys.appwriteDatabaseId,keys.appwriteCollectionId,id,JSON.stringify(props))
        } catch (error) {
            throw error
        }
    }
    async deleteDocument({id}){
        try {
            return await this.databases.deleteDocument(keys.appwriteDatabaseId,keys.appwriteCollectionId,id)
        } catch (error) {
            throw error
        }
    }
}

const database = new Database();
export default database;