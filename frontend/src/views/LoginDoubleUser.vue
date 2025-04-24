<template>
    <div class="grid grid-cols-2 gap-8 p-4">
        <UserLoginCard v-for="userId in [1, 2]" :key="userId" :user-id="userId" />
    </div>
</template>

<script setup>
    import UserLoginCard from '../components/UserLoginCard.vue';
</script>

  