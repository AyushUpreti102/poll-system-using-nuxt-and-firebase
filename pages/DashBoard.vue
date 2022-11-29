<template>
    <v-container v-if="loading" class="loader">
      <v-progress-circular
      :size="70"
      :width="7"
      color="#0D47A1"
      indeterminate
      ></v-progress-circular>
    </v-container>
    <v-container v-else>
      <PopUp name='Add Poll'/>
        <v-layout row wrap>
      <v-flex
        v-for="(value, index) in allPolls"
        :key="index"
        xs12
        sm6
        md4
        lg3
        style="padding: 10px; min-width: 200px"
      >
        <PollCard :pollDetails='value'/>
      </v-flex>
    </v-layout>
    </v-container>
</template>
<script>
import PollCard from '../components/PollCard.vue'
import PopUp from '../components/PopUp.vue'
export default {
    name: 'DashBoard',
    components: {
      PollCard,
      PopUp
    },
    async mounted(){
      this.loading = true,  
      await this.$store.dispatch('getPolls')
      this.loading = false
    },
    computed: {
      allPolls(){
        return this.$store.getters.allPolls;
      },
    },
    data(){
        return{
            polls: [],
            loading: true,
        }
    },
}
</script>
<style scoped>
  .loader{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>