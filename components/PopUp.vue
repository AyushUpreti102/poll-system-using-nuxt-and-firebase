<template>
    <v-container>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="showPollDetails"
        >
          {{name}}
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Add a new Poll
        </v-card-title>

        <v-card-title>
            <v-text-field label="Enter Your Poll Title" v-model="poll.title"></v-text-field>
        </v-card-title>
        <v-card-title>
            <v-text-field label="Enter Poll Options" v-model="poll.option"></v-text-field><v-btn text @click="addOption">Add</v-btn>
        </v-card-title>

        <v-card-text>
            <v-card>
                <v-card-title>{{poll.title}}</v-card-title>
                <v-card-text>
                  <div v-if="poll.options.length">select the option to delete</div>
                    <v-radio-group>
                      <v-radio
                        style="cursor: pointer;"
                        v-for="(n, i) in poll.options"
                        :key="i"
                        :label="`${n}`"
                        :value="n"
                        @click="showDelete(i)"
                      >
                    </v-radio>
                    <v-btn v-if="showDeleteBtn" @click="deleteOption"><v-icon text color="red">mdi-delete</v-icon></v-btn>
                    </v-radio-group>
                </v-card-text>
            </v-card>
          </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="addOrEditPoll"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
</template>
<script>

export default {
    name: 'PopUp',
    props: ['name', 'pollDetails'],
    data(){
        return{
            dialog: false,
            poll: {
                title: '',
                option: '',
                options: []
            },
            enableRadioBtn: true,
            showDeleteBtn: false,
            pollIndex: 0
        }
    },
    methods: {
        showPollDetails(){
          if(this.name==='Edit'){
            this.poll.title = this.pollDetails.title;
            this.pollDetails.options.map((el)=>{
              this.poll.options.push(el);
            });
          }
        },
        async addOrEditPoll(){
          if(this.name==='Add Poll'){
            if(this.poll.title !== '' && !this.poll.options.length < 3){
              await this.$store.dispatch('addPoll', {title: this.poll.title, options: this.poll.options})
              this.poll.title='';
              const options = []
              this.poll.options = options;
              this.dialog = false;
            }
            else{
              if(this.poll.title===''){
                this.$store.dispatch('alert', {message: 'enter title'})
              }
              else if(this.poll.options.length < 3){
                this.$store.dispatch('alert', {message: '3 options should be added in a poll'})
              }
            }
          }
          else{
            await this.$store.dispatch('editPoll', {id: this.pollDetails.id, title: this.poll.title, options: this.poll.options})
            this.poll.title='';
            const options = []
            this.poll.options = options;
            this.dialog = false;
          }
        },
        addOption(){
          if(!(this.poll.options.length > 2) && !(this.poll.option==='')){
              this.poll.options.push(this.poll.option);
              this.poll.option = ''
          }
          else{
            if(this.poll.option===''){
              this.$store.dispatch('alert', {message: 'fill the options field'})  
            }
            else{
              this.$store.dispatch('alert', {message: 'only 3 options are allowed in a poll'})
            }
          }
        },
        showDelete(i){
          this.showDeleteBtn = true
          this.pollIndex = i
        },
        deleteOption(){
          this.poll.options.splice(this.pollIndex, 1);
          this.showDeleteBtn = false;
        }
    }
}
</script>