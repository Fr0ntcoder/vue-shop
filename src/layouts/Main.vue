<template>
    <div class="wrapper">
        <Header />
        <main class="main">
            <div class="container">
                <div class="main-content">
                    <div class="content">
                        <router-view />
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default {
    name: "Main",
    components: {
        Header,Footer
    }
}
</script>
<style lang="scss">
    .main {
        &-content {
            display: flex;
        }
    }
    .content {
        width: 100%;
    }
</style>