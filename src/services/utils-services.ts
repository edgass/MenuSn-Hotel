import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export class UtilServices {
  async handleUpload(file) {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    // 'file' comes from the Blob or File API
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              console.log("Unknown error occurred, inspect error.serverResponse");
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              console.log("Error getting download URL:", error);
              reject(error);
            });
        }
      );
    });
  }
}

const utilServices = new UtilServices();
export default utilServices;
