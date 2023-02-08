<template>
    <div class="content">
        <div class="title">生息演算地图查询</div>
        <button class="start-btn" @click="startSearch">开始查询</button>
    </div>
    <div class="authorMsg">by：屿洺、KK、Maple</div>
</template>


<style scoped lang="less">
.content {
    height: 400px;
    width: 300px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    background-image: url('/backicon.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50% 40%;
    background-color: #fff;

    border-radius: 20px;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.368);

    .title {
        width: 100%;
        text-align: center;
        padding: 25px 0;
        color: #3b4348;
        font-size: 20px;
    }

    .start-btn {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 40px;
        margin: auto;

        width: 75%;
        border-radius: 13px;
        height: 40px;
        font-size: 20px;
        color: #f5f5f5;
        background-image: linear-gradient(to bottom right, rgba(105, 122, 161) 40%, rgba(231, 182, 193) 100%);
        box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.368);
        transition: all ease-in-out 200ms;
    }

    .start-btn:active{
        transform: translate(2px, 3px);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.368);
    }
}

.authorMsg {
    position: fixed;
    right: 10px;
    bottom: 10px;
    margin: auto;
    font-size: 10px;
}
</style>


<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();
let ribbon: any = document.getElementById('bgCanvas');

onMounted(() => {
    changeBackgroundState();
})
onBeforeUnmount(() => {
    changeBackgroundState();
})
function changeBackgroundState() {
    if (ribbon.style.display == 'block') ribbon.style.display = 'none';
    else ribbon.style.display = 'block';
}

function startSearch(){
    setTimeout(()=>{
        router.push('/search');
    },200);
}
</script>