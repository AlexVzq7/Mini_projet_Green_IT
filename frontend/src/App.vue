<template>
   <div class="main">
      <UserLoginCard :user-id="1" :user="user1" @update-user="updateUser1" class="component-left" />
      <GameBoard :users="[user1, user2]" @update-user="handleGameUpdate" />
      <UserLoginCard
         :user-id="2"
         :user="user2"
         @update-user="updateUser2"
         class="component-right"
      />
   </div>
   <accueil />
</template>

<script setup>
import { ref } from "vue";
import UserLoginCard from "./components/UserLoginCard.vue";
import GameBoard from "./components/GameBoard.vue";
import accueil from "./components/accueil.vue";

const user1 = ref({ username: "..." });
const user2 = ref({ username: "..." });

const updateUser1 = (newUser) => {
   user1.value = newUser;
};

const updateUser2 = (newUser) => {
   user2.value = newUser;
};

const handleGameUpdate = ({ userId, userData }) => {
   if (userId === 1) {
      user1.value = userData;
      localStorage.setItem("user_1", JSON.stringify(userData));
      console.log(userData);
   } else if (userId === 2) {
      user2.value = userData;
      localStorage.setItem("user_2", JSON.stringify(userData));
   }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

* {
   margin: 0;
   padding: 0;
   font-family: "Inter", sans-serif;
}
.main {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
   padding: 20px 40px;
   gap: 100px; /* Ajoute un espace équilibré entre les 3 composants */
   box-sizing: border-box;
}

.component-left {
   margin-left: 150px;
}

.component-right {
   margin-right: 150px;
}
</style>