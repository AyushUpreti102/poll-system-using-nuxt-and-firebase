<template>
    <v-app-bar app flat dense color="#1976D2" dark>
        <v-app-bar-title>Polling System</v-app-bar-title>
        <v-spacer></v-spacer>
        <nuxt-link to="SignIn" class="text-style">
            <v-btn text>Sign in</v-btn>
        </nuxt-link>
        <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
        <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title @click="selectedAction(item)">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
    </v-app-bar>
</template>
<script>
export default {
    name: 'NavBar',
    data(){
        return{
            items: [
                { title: 'Dashboard' },
                { title: 'Profile' },
                { title: 'Logout' },
            ],
        }
    },
    methods: {
      async selectedAction(action){
        if(action.title==='Logout'){
          await this.$store.dispatch('logout', {router: this.$router});
        }
      }
    }
}
</script>
<style scoped>
    .text-style{
        text-decoration: none;
    }
</style>