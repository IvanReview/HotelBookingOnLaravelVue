<template>
    <div class="loader">
        <v-progress-circular
            indeterminate
            color="red"
            size="120"
        ></v-progress-circular>
    </div>

</template>

<script>
export default {
    name: "Loader"
}
</script>

<style scoped>
    .loader{
        margin: 30px;
        width: 100%;
        text-align: center;
    }

</style>
