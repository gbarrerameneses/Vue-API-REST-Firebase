import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    }
  },
  getters: {
  },
  mutations: {
    cargar(state, payload){
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
      // localStorage.setItem('tareas', JSON.stringify(state.tareas))
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
      // localStorage.setItem('tareas', JSON.stringify(state.tareas))
    },
    tarea(state, payload) {
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
      // localStorage.setItem('tareas', JSON.stringify(state.tareas))
    }
  },
  actions: {
    async cargarLocalStorage({commit}) {
      try {
        const res = await fetch(`https://vue-udemy-api-38e7d-default-rtdb.firebaseio.com/tareas.json`)
        const dataDB = await res.json()
        // console.log(dataDB['tItV6C2j9'])
        const arrayTareas = []

        for(let id in dataDB){
          // console.log(id)
          // console.log(dataDB[id])
          arrayTareas.push(dataDB[id])
        }
        // console.log(arrayTareas)
        commit('cargar', arrayTareas)
      } catch (err) {
        console.log(err)
      }

      // if(localStorage.getItem('tareas')) {
      //   const tareas = JSON.parse(localStorage.getItem('tareas'))
      //   commit('cargar', tareas)
      //   return
      // }
      // localStorage.setItem('tareas', JSON.stringify([])) 
    },
    async setTareas({commit}, tarea){
      try {
        const res = await fetch(`https://vue-udemy-api-38e7d-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        console.log(dataDB);
      } catch (error) {
        console.log(error);
      }
      commit('set', tarea)
    },
    deleteTareas({commit}, id){
      commit('eliminar', id)
    },
    setTarea({commit}, id) {
      commit('tarea', id)
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})
