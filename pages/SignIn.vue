<template>
    <v-container class="SignInForm">
        <v-card style="width: 80%;" class="d-flex">
            <v-card-title class="FormImg">
                <img src="../static/istockphoto-1271983661-612x612.jpg" style="width: 100%; height: 100%;"/>
            </v-card-title>
            <v-card-subtitle class="Form">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >

                <v-text-field
                    v-model="username"
                    :counter="5"
                    :rules="usernameRules"
                    label="Username"
                    required
                    v-if="changeForm"
                ></v-text-field>
                
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
                
                <v-text-field
                    v-model="password"
                    :counter="8"
                    type="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                ></v-text-field>

                <v-select
                    v-if="changeForm"
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Role"
                    required
                ></v-select>
        
                <div class="d-flex flex-column align-center mt-4">
                    <v-btn
                        class="mb-4"
                        :disabled="!valid"
                        color="#1976D2"
                        large
                        height="50"
                        width="100%"
                        @click="validate"
                    >
                        {{changeForm ? 'Signup':'Signin'}}
                    </v-btn>
                    <v-btn
                        color="white"
                        light
                        large
                        height="50"
                        width="100%"
                    >
                        Login with google
                    </v-btn>
                    <div class="mt-4" @click="changeForm = !changeForm" style="cursor: pointer;">
                        {{changeForm ? 'Already have an account Signin ?' : 'Do not have an account Signup ?'}}
                    </div>
                </div>
                </v-form>
            </v-card-subtitle>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: 'SignIn',
    data(){
        return{
            valid: true,
            username: '',
            usernameRules: [
                v => !!v || 'password is required',
                v => (v && v.length >= 5) || 'username must be 5 characters more than',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'password is required',
                v => (v && v.length >= 8) || 'password must be 8 characters or more',
            ],
            select: null,
            items: [
                'Admin',
                'Guest',
            ],
            changeForm: false
        }
    },
    methods: {
        async validate () {
            this.$refs.form.validate()
            if(!this.changeForm){
                await this.$store.dispatch('validateLogin', {
                    email: this.email, 
                    password: this.password,
                    router: this.$router
                });
            }
            else{
                await this.$store.dispatch('validateSignUp', {
                    username: this.username, 
                    email: this.email, 
                    password: this.password, 
                    role: this.select,
                    router: this.$router
                });
            }
        },
    }
}
</script>
<style scoped>
    .d-flex{
        width: 100%;;
    }
    .SignInForm{
        min-height: 70vh;
        display: flex;
        justify-content: center;
        position: relative;
        top: 10vh;
    }
    .v-btn{
        width: 50%;
    }
    .FormImg{
        height: 100%; 
        width: 40%; 
    }
    .Form{
        width: 60%; 
        margin-top: 60px;
    }
    @media screen and (max-width: 600px){
        .v-btn{
            width: 100%;
            font-size: 12px;
        }
        .FormImg{
            display: none;
        }
        .Form{
            width: 100%;
        }
    }
</style>