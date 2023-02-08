<template>
    <div class="content">
        <div class="black-background"></div>
        <img src="/backicon.png" class="headImg" />

        <div class="scrollArea" @scroll="scroll">
            <div class="black"></div>
            <div class="serch-place" @touchstart="touchstart" @touchmove="touchmove">
                <div ref="topElement"></div>

                <van-tabs v-model:active="active" background="#0000003e" title-active-color="#fff"
                    title-inactive-color="#9c9c9c">
                    <van-tab title="地图">
                        <MapSearch :searchAreaClass="searchArea" :imgStateTag="imgStateTag"></MapSearch>
                    </van-tab>
                    <van-tab title="食物">
                        <FoodSearch :imgStateTag="imgStateTag"></FoodSearch>
                    </van-tab>
                </van-tabs>

            </div>

        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    height: 100vh;
    width: 100%;

    flex-direction: column;

    .headImg {
        height: 200px;
        width: 100%;
        object-fit: contain;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }

    .scrollArea {
        height: 100vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        z-index: 1;

        .black {
            min-height: 200px;
        }

        .serch-place {
            flex: 1;
            // background-color: gray;
            width: 100%;
            border-radius: 20px 20px 0 0;
            background-image: linear-gradient(to bottom right, rgba(105, 122, 161) 40%, rgba(231, 182, 193) 100%);
            position: relative; //search-area 为absolute就会跟着跑，为fixed就会驻留
        }
    }
}

:deep(.van-tabs__wrap) {
    padding: 0;
    border-radius: 20px 20px 20px 20px;
    z-index: 10;
    height: 45px;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import MapSearch from './SearchContent/MapSearch.vue';
import FoodSearch from './SearchContent/FoodSearch.vue';

const PageInfo = {
    min: 0,
    max: 1
}
let active = ref(PageInfo.min);

//搜索框的样式
let searchArea = ref('search-area');
let topElement: any = ref(); //定位元素

function getTop(element: any) {
    let offset = element.getBoundingClientRect().top;
    return offset;
}

let scroll = (() => {
    //要节流
    let ticked = false;
    return () => {
        if (!ticked) {
            ticked = true;
            window.requestAnimationFrame(() => {
                let top = getTop(topElement.value);
                if (top > -40) {
                    if (searchArea.value != 'search-area') {
                        searchArea.value = 'search-area'
                    }
                } else {
                    if (searchArea.value != 'search-area-stay') {
                        searchArea.value = 'search-area-stay'
                    }
                }
                ticked = false;
            });
        }
    };
})();

//由于transform导致fixed失效，需要手动进行页面切换（vant的滑动要用transform）
let change = false;
let startX = 0;
function touchstart(event: any) {
    change = false;
    startX = event.touches[0].screenX;
}
let touchmove = (event: any) => {
    //要进行节流
    let ticking = false;
    if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
            let currentX = event.touches[0].screenX;
            let changed = currentX - startX;
            if (Math.abs(changed) > 80) { //变化较大考虑换页
                if (changed < 0 && active.value < PageInfo.max) active.value++; //往左拉
                if (changed > 0 && active.value > PageInfo.min) active.value--; //往右拉
            }
            ticking = false;
        })
    }
}

let imgStateTag = ref(false); //子组件监听这个值改变就知道换页了
function closePic() { //切换标签页后应当将原来标签页的给放大图片给关闭
    imgStateTag.value = !imgStateTag.value;
}
watch(active, () => {
    setTimeout(closePic, 10);
})
</script>