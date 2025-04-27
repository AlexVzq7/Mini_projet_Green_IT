<template>
   <div class="grid grid-cols-2 gap-8 p-4">
      <UserLoginCard v-for="id in [1, 2]" :key="id" :user-id="id" />
   </div>

   <div v-if="bothConnected" class="flex justify-center mt-8">
      <button @click="startGame" class="px-6 py-3 bg-green-600 text-white rounded-lg text-lg">
         Commencer la partie
      </button>
   </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import UserLoginCard from "../components/UserLoginCard.vue";

// macro, PAS d’import !
const emit = defineEmits(["start"]);

const user1 = ref(null);
const user2 = ref(null);

const bothConnected = computed(() => user1.value && user2.value);

function startGame() {
   emit("start");
}

onMounted(() => {
   user1.value = JSON.parse(localStorage.getItem("user_1") || "null");
   user2.value = JSON.parse(localStorage.getItem("user_2") || "null");
   window.addEventListener("storage", () => {
      user1.value = JSON.parse(localStorage.getItem("user_1") || "null");
      user2.value = JSON.parse(localStorage.getItem("user_2") || "null");
   });
});
</script>
