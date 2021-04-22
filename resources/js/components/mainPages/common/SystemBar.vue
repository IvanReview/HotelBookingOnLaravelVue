<template>
    <div>
        <v-system-bar
            dark
            color="black"
            app
        >
            <v-icon>mdi-message</v-icon>
            <span>10 unread messages</span>
            <v-spacer></v-spacer>
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-cellular-outline</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>{{ date.toLocaleString("ru", options) }}</span>
        </v-system-bar>
    </div>
</template>

<script>
export default {
    name: "SystemBar",
    data: () => ({
        date: new Date(),
        interval: null,
        options: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
    }),
    mounted() {
        this.interval = setInterval( () => {
            this.date = new Date()
        }, 1000);
    },
    destroyed() {
        clearInterval(this.interval)
    }
}
</script>

<style scoped>

</style>
