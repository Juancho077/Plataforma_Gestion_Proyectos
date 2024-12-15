// Importar las funciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Subir imagen y guardar datos en Firestore
document.getElementById("upload-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageFile = document.getElementById("image-file").files[0];
    const albumName = document.getElementById("album-name").value;
    const imageTags = document.getElementById("image-tags").value.split(",");

    // Subir imagen a Firebase Storage
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Guardar los datos de la imagen en Firestore
    await addDoc(collection(db, "images"), {
        album: albumName,
        tags: imageTags,
        url: imageUrl,
    });

    // Alerta de éxito
    alert("Imagen subida correctamente");
});
