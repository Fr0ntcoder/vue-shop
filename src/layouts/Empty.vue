<template>
    <div class="wrapper">
        <Header/>
        <main class="main">
            <div class="container">
                <div class="empty-wrap">
                    <Sidebar/>
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
import Sidebar from "@/components/Sidebar"
export default {
    name: "Empty",
    components: {
        Header,Footer,Sidebar
    }
}
</script>

<style lang="scss">
    .empty {
        &-wrap {
            display: flex;
            justify-content: space-between;
        }
        &-content {
            width: 75%;
        }
    }
</style>