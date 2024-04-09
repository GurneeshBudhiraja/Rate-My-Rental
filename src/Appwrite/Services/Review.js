import { Client, Databases, Query, ID } from "appwrite";
import keys from "../../keys/keys";

class Review {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(keys.appwriteEndpoint)
      .setProject(keys.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  // Get all reviews
  getReviews(queryArray=null) {
    return this.databases.listDocuments(
      keys.appwriteDatabaseId,
      keys.appwriteCollectionId,
      queryArray && 
      JSON.parse(queryArray)
    );
  }
  // Create a new review
  createReview(ID,data) {
    return this.databases.createDocument(
      keys.appwriteDatabaseId,
      keys.appwriteCollectionId,
      ID,
      JSON.stringify(data)
    );
  }
  // Delete a review
  deleteReview(documentId ) {
    return this.databases.deleteDocument(
      keys.appwriteDatabaseId,
      keys.appwriteCollectionId,
      documentId
    );
  }
  // Update a review
  updateReview({ documentId, data }) {
    return this.databases.updateDocument(
      keys.appwriteDatabaseId,
      keys.appwriteCollectionId,
      documentId,
      JSON.stringify(data)
    );
  }
}

const review = new Review();
export default review;
