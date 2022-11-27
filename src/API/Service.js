import { db, storage } from './firebase'
import { collection, doc, arrayUnion, addDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayRemove, Timestamp } from 'firebase/firestore/lite';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

/** Class for requests */
class Service {
    /** Get all todos
     * @returns {array<object>} Array of objects todos
     */
    static async getAll() {
        const todosCol = collection(db, 'todos');
        const todosSnapshot = await getDocs(todosCol);
        const data = todosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return data;
    }

    /**
     * Get single todo by id
     * @param {string} id id of todo
     * @returns {object} object todo
     */
    static async getSingle(id) {
        const todoDoc = doc(db, "todos", id)
        const dataSnap = await getDoc(todoDoc)
        const data = { ...dataSnap.data(), id: dataSnap.id }
        return data
    }

    /**
     * Post single todo
     * @param {array<File>} files array of files to upload, empty array if no files to upload
     * @param {object} todo object todo
     * @returns {object} object todo
     */
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

    /**
     * Update single todo by id
     * @param {string} id id of todo
     * @param {object} newData object todo
     * @returns {Promise} 
     */
    static async updateSingle(id, newData) {
        const todoDoc = doc(db, "todos", id);
        return updateDoc(todoDoc, newData)
    }

    /**
     * Delete single todo by id
     * @param {string} id id of todo
     * @param {object} files list of files object with files info
     * @returns {Promise}
     */
    static async deleteSingle(id, files) {
        await Promise.all(
            files.map((file) => {
                return this.deleteFile(id, file)
            })
        )
        const todoDoc = doc(db, "todos", id)
        return deleteDoc(todoDoc)
    }

    /**
     * Upload files to firebase storage, if optional parameter id was passed upadate todo object with file's info
     * @param {array<File>} files list of files to upload 
     * @param {string} [todoId] id of todo
     * @returns {array<object>} array of object with file info, empty array if there are no files to upload
     */
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

    /**
     * Delete single file
     * @param {string} todoId id of todo
     * @param {object} file file object with file info
     * @returns {Promise}
     */
    static async deleteFile(todoId, file) {
        const fileRef = ref(storage, file.name)
        this.updateSingle(todoId, { files: arrayRemove(file) })
        return deleteObject(fileRef);
    }
}

export default Service