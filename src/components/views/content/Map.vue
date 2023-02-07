<template>
    <div :class="contentClass" class="content" @click="changeShow">
        <img :src="src" class="map"/>
    </div>
</template>

<style lang="less" scoped>
.content{
    transition: all ease-in-out 200ms;
}
.content-mini{
    width: 100%;
    margin: 30px 0;
    background-color: #00000000;
}
.content-large{
    z-index: 100;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;

    background-color: #000000aa;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}
.map{
    width: 100%;
    object-fit: contain;
    border-radius: 15px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
let props = defineProps(['src']);

let contentClass = ref('content-mini');
function changeShow(){
    if(contentClass.value == 'content-mini') contentClass.value = 'content-large';
    else contentClass.value = 'content-mini';
}
</script>