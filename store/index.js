import { collection, onSnapshot, doc, addDoc, deleteDoc, setDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {db} from '../plugins/firebase'

export const state = ()=> ({
    polls: [],
    snackbar: {
      show: false,
      message: ''
    }
})

export const getters = {
    snackbar: (state)=>{
      return state.snackbar;
    },
    allPolls(state) {
      return state.polls
    }
}

export const mutations = {
  ALERT: (state, alert)=>{
    state.snackbar.show = true;
    state.snackbar.message = alert.message
  },
  CLOSE__SNACKBAR: (state)=>{
    state.snackbar.show = false;
  },
  GET_POLLS: (state, polls)=>{
    state.polls = polls;
  }
}

export const actions = {
  alert: (context, alert)=>{
    context.commit('ALERT', alert)
  },
  closeSnackBar: (context)=>{
    context.commit('CLOSE__SNACKBAR')
  },
  getPolls: async (context)=>{
    await onSnapshot(collection(db, 'polls'), snapshot=>{
      const polls = [];
      snapshot.forEach(doc=>{
          polls.push({
            id: doc.id,
            createdAt: serverTimestamp(),
            title: doc.data().title,
            options: doc.data().options
          });
      })
      context.commit('GET_POLLS', polls)
    })
  },
  validateLogin: async (context, loginDetails)=>{
    try{
      const result = await signInWithEmailAndPassword(getAuth(), loginDetails.email, loginDetails.password)
      loginDetails.router.push({name: 'DashBoard'})
      const q = await query(collection(db, "users"), where("uid", "==", result.user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        localStorage.setItem('user', JSON.stringify(doc.data()))
      });
    }
    catch (err){
      context.commit('ALERT', err);
    }
  },
  validateSignUp: async (context, signUpDetails)=>{
    const result = await createUserWithEmailAndPassword(getAuth(), signUpDetails.email, signUpDetails.password)
    if(result){
      signUpDetails.router.push({name: 'DashBoard'})
    }
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      createdAt: serverTimestamp(),
      userName: signUpDetails.username,
      role: signUpDetails.role
    }, {merge: true});
  },
  logout: async (context, router)=>{
    await signOut(getAuth());
    router.router.push({name: 'index'});
    localStorage.clear();
  },
  addPoll : async (context, poll)=>{
    await addDoc(collection(db, 'polls'), {
      title: poll.title,
      options: poll.options
    })
  },
  deletePoll : async (context, id)=>{
    await deleteDoc(doc(db, 'polls', id));
  }
}