<template>
   <div class="user-login-card">
      <div v-if="!user || user.username === '...'">
         <h2 class="title">Utilisateur {{ userId }}</h2>

         <input v-model="username" placeholder="Nom d'utilisateur" class="input" />
         <input v-model="password" type="password" placeholder="Mot de passe" class="input" />

         <div class="button-group">
            <button @click="login()" class="btn btn-blue">Connexion</button>
            <button @click="register()" class="btn btn-green">Créer un compte</button>
         </div>

         <p class="error" v-if="error">{{ error }}</p>
      </div>

      <div v-else>
         <h2 class="title text-green-700">Connecté : {{ user.username }}</h2>
         <p><strong>Score :</strong> {{ user.score }}</p>
         <p><strong>Émission CO2 :</strong> {{ user.emissionCO2 }} g</p>
         <button @click="logout()" class="btn btn-gray">Se déconnecter</button>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
   userId: Number,
   user: Object,
});

const emit = defineEmits(["update-user"]);

const username = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
   error.value = "";
   try {
      const res = await fetch("http://localhost:3000/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username: username.value, password: password.value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem(`user_${props.userId}`, JSON.stringify(data.user));
      emit("update-user", data.user);
   } catch (err) {
      error.value = err.message;
   }
};

const register = async () => {
   error.value = "";
   try {
      const res = await fetch("http://localhost:3000/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username: username.value, password: password.value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem(`user_${props.userId}`, JSON.stringify(data.user));
      emit("update-user", data.user);
   } catch (err) {
      error.value = err.message;
   }
};

const logout = () => {
   localStorage.removeItem(`user_${props.userId}`);
   emit("update-user", { username: "..." });
   username.value = "";
   password.value = "";
};

onMounted(() => {
   const savedUser = localStorage.getItem(`user_${props.userId}`);
   if (savedUser) {
      emit("update-user", JSON.parse(savedUser));
   }
});
</script>

<style scoped>
.user-login-card {
   background: #fafafa;
   padding: 20px;
   border-radius: 15px;
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
   width: 100%;
   min-width: 220px;
   max-width: 250px;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.title {
   font-size: 1.25rem;
   font-weight: bold;
   margin-bottom: 20px;
   text-align: center;
}

.input {
   width: 90%;
   margin-bottom: 10px;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 8px;
}

.button-group {
   display: flex;
   gap: 10px;
   margin-bottom: 10px;
}

.btn {
   padding: 8px 16px;
   border: none;
   border-radius: 8px;
   font-weight: bold;
   cursor: pointer;
   transition: background-color 0.3s, transform 0.2s;
}

.btn-blue {
   background-color: #3490dc;
   color: white;
}
.btn-blue:hover {
   background-color: #2779bd;
   transform: scale(1.05);
}

.btn-green {
   background-color: #38c172;
   color: white;
}
.btn-green:hover {
   background-color: #2fa360;
   transform: scale(1.05);
}

.btn-gray {
   background-color: #6b7280;
   color: white;
   margin-top: 20px;
}
.btn-gray:hover {
   background-color: #4b5563;
   transform: scale(1.05);
}

.error {
   color: #e3342f;
   margin-top: 10px;
   font-size: 0.9rem;
   text-align: center;
}
</style>
