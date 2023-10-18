<template>
    <span class="text-gray-400 dark:text-white">
        <span class="bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text text-transparent">{{ hours }}</span>:<span class="bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent">{{ minutes }}</span>:<span class=" bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">{{ seconds }}</span>
    </span>
</template>

<script>
export default {
    props: ['hours', 'minutes', 'seconds']
};
</script>

<style lang="scss" scoped></style>