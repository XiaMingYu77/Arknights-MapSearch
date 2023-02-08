<template>
    <div :class="contentClass" class="list-content" @click.stop="changeShow" ref="area">
        <div class="background"></div>
        <img :src="src" class="foodimg">
    </div>
</template>

<style lang="less" scoped>
.list-content {
    transition: all ease-in-out 200ms;
}

.content-mini {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    .foodimg {
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

    padding: 20px 10px 0 10px;
    overflow: auto;

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
    .foodimg {
        z-index: 5;
        margin-bottom: 13px;
    }
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
let tag: any = newProps.imgStateTag;
let area: any = ref();

let contentClass = ref('content-mini');
function changeShow() {
    if (contentClass.value == 'content-mini') {
        contentClass.value = 'content-large';
        area.value.addEventListener('touchmove', eventPreventDefault);
    }
    else {
        contentClass.value = 'content-mini';
        area.value.removeEventListener('touchmove', eventPreventDefault);
    }
}

//通过监听父组件广播来关闭放大
function closePic() {
    contentClass.value = 'content-mini';
}
watch(tag, () => {
    closePic();
})

function eventPreventDefault(event: any) {
    event.stopPropagation()
}

</script>