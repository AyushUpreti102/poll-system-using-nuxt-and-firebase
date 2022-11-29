<template>
    <v-card elevation="4" class="mx-auto">
          <v-card-title>{{pollDetails.title}}</v-card-title>
          <v-card-text>
            <v-radio-group>
              <v-radio
                v-for="n in pollDetails.options"
                :key="n"
                :label="`${n}`"
                :value="n"
                :disabled="enableRadioBtn"
              >
              </v-radio>
            </v-radio-group>
            <v-card-actions>
              <PopUp name='Edit' :pollDetails="pollDetails"/>
              <v-spacer></v-spacer>
              <v-btn text @click="deletePoll">delete <v-icon small>mdi-delete</v-icon></v-btn>
            </v-card-actions>
          </v-card-text>
    </v-card>
</template>
<script>
import PopUp from './PopUp.vue';

export default {
    name: "PollCard",
    components: { PopUp },
    props: ["pollDetails"],
    data() {
        return {
            enableRadioBtn: true,
        };
    },
    methods: {
      async deletePoll(){
        this.$store.dispatch('deletePoll', this.pollDetails.id)
      },
    }
}
</script>