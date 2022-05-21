<template>
    <div id="secure" >
        <h1>Login Success</h1>
        <p>
            Login Success!<br/>
            {{ name }}
        </p>
    </div>
</template>

<script>
import axios from "axios";
    const token = localStorage.getItem('token');
    export default {
        name: 'Private',
        data() {
            return {
                name: ""
            };
        },
        created() {
            this.dataUser();
        },
        methods: {
            dataUser: async() => {
                if(!token) {
                     this.$router.replace({ name: "error" })
                } else {
                    const post = await axios({
                        method: "get",
                        url: "http://localhost:3002/api/private",
                        headers: { 
                            "content-type": "application/x-www-form-urlencoded", 
                            "token": token 
                        }
                    })
                   
                    this.name = post.data.data.username;
                    console.log(this.username);
                   
                }
            }
        },
        
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>