<template>
  <v-app>
    <div class="text-center ma-2">
      <v-snackbar
      v-model="snackbar.show"
      timeout="-1"
      top
      >
      {{ snackbar.message }}
      
      <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="closeSnackbar"
            >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-main style="padding: 30px 0 0;">
      <NavBar/>
      <nuxt/>
    </v-main>
  </v-app>
</template>
<script>
import NavBar from '../components/NavBar.vue';
export default{
  name: 'default',
  components: {
    NavBar
  },
  computed: {
    snackbar(){
      return this.$store.getters.snackbar
    }
  },
  methods: {
    closeSnackbar(){
      this.$store.dispatch('closeSnackBar')
    }
  }
}
</script>
<style scoped>
  .v-application{
    background-image: linear-gradient(#2c3e50, #3498db);
  }
</style>