import { Client, Databases, Query, ID} from "appwrite";
import keys from "../../keys/keys"

class Review{
  client = new Client();
  databases;
  constructor(){
    this.client
    .setEndpoint(keys.appwriteEndpoint)
    .setProject(keys.appwriteProjectId)
    this.databases = new Databases(this.client);
  }

  getReview({address}){
    console.log(address);
    return (
      this.databases.listDocuments(
        keys.appwriteDatabaseId,
        keys.appwriteCollectionId,
        Query.equal('address',[""])
        
      )
    )
  }
}


const review=new Review();
export default review;