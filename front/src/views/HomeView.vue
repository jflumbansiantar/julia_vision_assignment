<template>
  <div id="container">
   <header>
     FRONT
   </header>
   <div className="list">
     <ul style="list-style: none">
         <li>
            <button>
              <router-link to="/login" tag="button">LOGIN</router-link>
            </button> 
        </li>
     </ul>
   </div>
  </div>
</template>

<style scoped>
  #container {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
.list {
    width: 1024px;
    margin: auto;
}
</style>