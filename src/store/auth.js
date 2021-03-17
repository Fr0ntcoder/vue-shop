import firebase from "firebase/app"

export default {
    state: {

    },
    mutations: {
    },
    actions: {
        async REGISTRATION({dispatch,commit},{name,email,password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email,password)
            }catch(e) {
                console.log(e)
            }
        },
        getUserId() {
            const user = firebase.auth().currentUser

            return user ? userId: null
        }
    },
    getters: {}
}