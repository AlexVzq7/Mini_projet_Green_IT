<template>
    <div class="bg-white p-6 rounded-2xl shadow w-full max-w-md">
      <div v-if="!user">
        <h2 class="text-xl font-bold mb-4">Utilisateur {{ userId }}</h2>
  
        <input v-model="username" placeholder="Nom d'utilisateur" class="w-full mb-2 p-2 border rounded" />
        <input v-model="password" type="password" placeholder="Mot de passe" class="w-full mb-4 p-2 border rounded" />
  
        <div class="flex gap-2">
          <button @click="login" class="px-4 py-2 bg-blue-500 text-white rounded">Connexion</button>
          <button @click="register" class="px-4 py-2 bg-green-500 text-white rounded">Créer un compte</button>
        </div>
  
        <p class="text-red-500 mt-2" v-if="error">{{ error }}</p>
      </div>
  
      <div v-else>
        <h2 class="text-xl font-bold mb-4 text-green-700">Connecté : {{ user.username }}</h2>
        <p><strong>Score :</strong> {{ user.score }}</p>
        <p><strong>Émission CO2 :</strong> {{ user.emissionCO2 }} kg</p>
        <button @click="logout" class="mt-4 px-4 py-2 bg-gray-600 text-white rounded">Se déconnecter</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    userId: Number
  });
  
  const username = ref('');
  const password = ref('');
  const user = ref(null);
  const error = ref('');
  
  const login = async () => {
    error.value = '';
    console.log("Tentative de connexion");
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      user.value = data.user;
      localStorage.setItem(`user_${props.userId}`, JSON.stringify(data.user));
    } catch (err) {
      error.value = err.message;
    }
  };
  
  const register = async () => {
    error.value = '';
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      user.value = data.user;
      localStorage.setItem(`user_${props.userId}`, JSON.stringify(data.user));
    } catch (err) {
      error.value = err.message;
    }
  };
  
  const logout = () => {
    user.value = null;
    localStorage.removeItem(`user_${props.userId}`);
    username.value = '';
    password.value = '';

  };

  onMounted(() => {
    const savedUser = localStorage.getItem(`user_${props.userId}`);
    if (savedUser) {
        user.value = JSON.parse(savedUser);
    }
  });
</script>
  