<template>
 <form @submit.prevent="procesarFormulario">
  <Input :tarea="tarea" />
 </form>
 <hr>
 <!-- <p>{{ tarea }}</p> -->
 <ListarTareas />
</template>

<script>
import Input from '@/components/Input'
import ListarTareas from '@/components/ListarTareas'
import { mapActions } from 'vuex'
const shortid = require('shortid');


export default {
  name: 'HomeView',
  components: {
    Input, ListarTareas
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas']),
  procesarFormulario(){
    if(this.tarea.nombre.trim() === ''){
      console.log('nombre Vacío')
      return
    }
      console.log('no está vacío')
      //generar id
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id);
      //se envían los datos
      this.setTareas(this.tarea)

      // limpiar datos
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
}
</script>
