<template>
    <div :class="contentClass" class="list-content" @click="changeShow">
        <img :src="src" class="foodimg">
    </div>
</template>

<style lang="less" scoped>
.list-content {
    transition: all ease-in-out 200ms;
}

.content-mini {
    width: 100%;
    background-color: #00000000;

    .foodimg{
        margin: 20px 0;
    }
}

.content-large {
    z-index: 100;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;

    background-color: #000000aa;
    padding: 20px 10px 0 10px;
    overflow: auto;
}

.foodimg {
    width: 100%;
    object-fit: contain;
}
</style>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';

let props = defineProps(['src', 'imgStateTag']);

let newProps = toRefs(props);
let tag:any = newProps.imgStateTag;

let contentClass = ref('content-mini');
function changeShow(){
    if(contentClass.value == 'content-mini') contentClass.value = 'content-large';
    else contentClass.value = 'content-mini';
}

//通过监听父组件广播来关闭放大
function closePic(){
    contentClass.value = 'content-mini';
}
watch(tag, () => {
    closePic();
})
</script>