import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

 // Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAhcBoskVSV7c5zubdPyBEdMFOxMoexV2Q",
authDomain: "test-3324e.firebaseapp.com",
projectId: "test-3324e",
storageBucket: "test-3324e.firebasestorage.app",
messagingSenderId: "1080633562766",
appId: "1:1080633562766:web:d18fa739b0a01fd16edbdf"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productosRef = collection(db, "productos");

async function agregarProducto() {
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;
    if (nombre && precio) {
        await addDoc(productosRef, { nombre, descripcion, precio, imagen });
        cargarProductos();
    }
}

async function cargarProductos() {
    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";
    const querySnapshot = await getDocs(productosRef);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        lista.innerHTML += `<li class='list-group-item d-flex justify-content-between'>
            ${data.nombre} - ${data.descripcion} - $${data.precio} - <img src='${data.imagen}' alt='${data.nombre}' style='width: 50px; height: 50px;'>
            <button class='btn btn-danger btn-sm' onclick="eliminarProducto('${doc.id}')">Eliminar</button>
        </li>`;
    });
}

async function eliminarProducto(id) {
    await deleteDoc(doc(db, "productos", id));
    cargarProductos();
}

window.agregarProducto = agregarProducto;
window.eliminarProducto = eliminarProducto;
window.onload = cargarProductos;