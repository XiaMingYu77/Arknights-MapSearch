<template>
    <div :class="contentClass" class="content" @click="changeShow">
        <img :src="src" class="map" />
        <div class="linkArea">
            <a :href="`https://search.bilibili.com/all?keyword=${name}`" target="_blank" class="link"
                @click.stop>B站攻略=></a>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    transition: all ease-in-out 200ms;

    .link{
        font-size: 16px;
    }
}

.content-mini {
    width: 100%;
    margin: 30px 0;
    background-color: #00000000;

    .link {
        color: #1e497e;
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
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;


    .linkArea{
        display: block;
        width: 100%;
        margin-top: 10px;
        text-align: center;
        
        .link{
            color: #f5f5f5;;
        }
    }
}

.map {
    width: 100%;
    object-fit: contain;
    border-radius: 15px;
}
</style>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';

let props = defineProps(['src', 'name', 'imgStateTag']);
let newProps = toRefs(props);
let tag: any = newProps.imgStateTag;

let contentClass = ref('content-mini');
function changeShow() {
    if (contentClass.value == 'content-mini') contentClass.value = 'content-large';
    else contentClass.value = 'content-mini';
}

function closePic() {
    contentClass.value = 'content-mini';
}
//通过监听父组件广播来关闭放大
watch(tag, () => {
    closePic();
})

</script>