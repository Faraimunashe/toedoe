<template>
    <div class="container py-5">
        <h1>404</h1>
        <p>Sorry, the page you're looking for is not found!</p>
        <router-link :to="{ name: 'tasks' }">Back to your tasks</router-link>
    </div>
</template>