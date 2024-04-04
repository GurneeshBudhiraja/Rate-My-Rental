import { Client, Account, ID} from "appwrite";
import keys from "../../keys/keys.js";

class Auth {
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(keys.appwriteEndpoint)
        .setProject(keys.appwriteProjectId);
        this.account=new Account(this.client);
    }
    signup = ({email, password,name})=>{
        try {
            return this.account.create(ID.unique(), email, password,name);
        } catch (error) {
            return error;
        }
    }
    login = ({email, password})=>{
        return this.account.createEmailPasswordSession(email, password);
    }
    currentUser = ()=>{
        return this.account.get();
    }

    logout = ()=>{
        return this.account.deleteSessions();
    }

}

const auth = new Auth()
export default auth;