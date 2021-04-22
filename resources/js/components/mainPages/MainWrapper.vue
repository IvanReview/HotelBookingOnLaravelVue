<template>
    <v-app id="inspire">

        <SystemBar/>

        <Header/>

        <v-main>
<!--            <SearchForm/>-->

            <v-container>
                <!-- Контент -->
                <router-view></router-view>

            </v-container>
        </v-main>

        <Footer/>
    </v-app>
</template>

<script>
import Header from "./common/Header";
import Footer from "./common/Footer";
import SystemBar from "./common/SystemBar";
import SearchForm from "./SearchForm";
export default {
    name: "MainWrapper",
    components: {SearchForm, SystemBar, Footer, Header},

}
</script>

<style lang="scss">
    #inspire a {
        color: #fff;
        text-decoration: none;
}

</style>
