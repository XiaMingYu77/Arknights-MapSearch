<template>
    <div :class="contentClass" class="content" @click.stop="changeShow" ref="area">
        <div class="background"></div>
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

    .map {
        width: 100%;
        object-fit: contain;
    }

    .link {
        font-size: 16px;
    }
}

.content-mini {
    width: 100%;
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0);

    .map {
        border-radius: 15px;
    }

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

    padding: 10px;
    border-radius: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .background{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        background-color: #000;
        opacity: 0.65;
        z-index: -1;
    }
    .map {
        z-index: 5;
        border-radius: 15px;
    }

    .linkArea {
        display: none;
        width: 100%;
        margin-top: 10px;
        text-align: center;

        .link {
            color: #f5f5f5;
            ;
        }
    }
}
</style>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';

let props = defineProps(['src', 'name', 'imgStateTag']);
let newProps = toRefs(props);
let tag: any = newProps.imgStateTag;
let area: any = ref();

let contentClass = ref('content-mini');
function changeShow() {
    if (contentClass.value == 'content-mini') {
        contentClass.value = 'content-large';
        //放大时需要禁用touchmove的冒泡
        area.value.addEventListener('touchmove', eventPreventDefault);
    }
    else {
        contentClass.value = 'content-mini';
        area.value.removeEventListener('touchmove', eventPreventDefault);
    }
}

function closePic() {
    contentClass.value = 'content-mini';
}
//通过监听父组件广播来关闭放大
watch(tag, () => {
    closePic();
})


function eventPreventDefault(event: any) {
    event.stopPropagation()
}

</script>