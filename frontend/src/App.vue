<template>
  <div class="main">
    <UserLoginCard
      :user-id="1"
      :user="user1"
      @update-user="updateUser1"
      class="component-left"
    />
    <GameBoard
      :users="[user1, user2]"
      @update-user="handleGameUpdate"
      class="GameBoard"
    />
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
  font-family: "Inter", sans-serif;
}
.main {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
}

@media (max-width: 480px) {
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .component-left {
    transform: scale(0.5);
    margin-left: 0;
  }
  .component-right {
    transform: scale(0.5);
    margin-right: 0;
  }
}

@media (min-width: 1300px) {
  #main {
    padding: 0 100px;
  }
  .component-left {
    margin-left: 50px;
  }
  .component-right {
    margin-right: 50px;
  }
}
</style>
