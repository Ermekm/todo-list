import { db, storage } from '../firebase'
import { collection, doc, arrayUnion, addDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayRemove, Timestamp } from 'firebase/firestore/lite';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';


export default class Service {
    static async getAll() {
        const todosCol = collection(db, 'todos');
        const todosSnapshot = await getDocs(todosCol);
        const data = todosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return data;
    }

    static async getSingle(id) {
        const todoDoc = doc(db, "todos", id)
        const dataSnap = await getDoc(todoDoc)
        const data = { ...dataSnap.data(), id: dataSnap.id }
        return data
    }

    static async postSingle(files, todo) {
        const filesData = await this.postFiles(files);
        const newTodo = {
            ...todo,
            date: todo.date ? Timestamp.fromDate(new Date(todo.date)) : '',
            files: filesData
        }
        const todosCol = collection(db, 'todos');
        const dataSnap = await addDoc(todosCol, newTodo)
        const data = {
            ...newTodo,
            id: dataSnap.id,
            data: todo.date
        }
        return data
    }

    static async updateSingle(id, newData) {
        const todoDoc = doc(db, "todos", id);
        return updateDoc(todoDoc, newData)
    }

    static async deleteSingle(id, files) {
        await Promise.all(
            files.map((file) => {
                return this.deleteFile(file.name, id, file)
            })
        )
        const todoDoc = doc(db, "todos", id)
        return deleteDoc(todoDoc)
    }

    static async postFiles(files, todoId) {
        if (!files.length) return []

        const responses = await Promise.all(
            Array.prototype.map.call(files, (file) => {
                const imageRef = ref(storage, file.name + v4());
                return uploadBytes(imageRef, file)
            })
        )

        const filesData = [];
        await Promise.all(
            responses.map((res) => {
                return getDownloadURL(res.ref).then((url) => {
                    filesData.push({
                        url: url,
                        name: res.metadata.name,
                        path: res.ref.fullPath
                    })
                })
            })
        )
        if (todoId) {
            this.updateSingle(todoId, { files: arrayUnion(...filesData) })
        }
        return filesData
    }

    static async deleteFile(name, todoId, file) {
        const fileRef = ref(storage, name)
        if (todoId && file) {
            this.updateSingle(todoId, { files: arrayRemove(file) })
        }
        return deleteObject(fileRef);
    }
}