<template>
    <div class="mapSearch">
        <div :class="searchAreaClass">
            <div class="search">
                <input type="text" v-model="searchKey" @keydown.enter="search" @input="search" />
                <button class="search-btn" @click="search">搜索</button>
            </div>
        </div>
        <ShowMap v-if="showMap" :mapList="mapList" class="maplist" :imgStateTag="imgStateTag"></ShowMap>
        <div class="empty" v-if="!showMap">
            <div class="text">{{ hint }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.mapSearch {

    .search-area-stay {
        .search-area();
        position: fixed;
        top: 45px;
        left: 0;
        right: 0;
    }

    .search-area {
        padding: 10px 20px;
        background-color: #687AA0;

        position: absolute;
        top: 45px;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;
        justify-content: end;
        .search {
            // width: 100%;

            display: flex;
            border-radius: 20px;
            border: 2px solid #FFDC01;
            background-color: #fffced;
            overflow: hidden;
            align-items: center;
            font-size: 15px;

            input {
                outline: none;
                background-color: inherit;
                flex: 1;
                height: 100%;
                border: 0;
                padding: 0 20px 0 20px;
                width: 100px;
            }

            .search-btn {
                font-size: 18px;
                position: relative;
                padding: 6px 15px;
                border-radius: 20px;
                background-color: #FFDC01;
                outline: none;
                border: none;
                overflow: hidden;
                transition: background-color .25s;
            }

            .search-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: radial-gradient(circle, #ff7439 10%, transparent 10.1%);
                transform: scale(10);
                opacity: 0;
                transition: all .6s;
            }

            .search-btn:active::after {
                transform: scale(0);
                opacity: .5;
                transition: 0s;
            }

        }
    }

    .maplist {
        margin-top: 65px;
        padding: 0 20px;
    }

    .empty {

        .text {
            margin-top: 100px;
            text-align: center;
            white-space: pre-line;
            line-height: 1.5;
            color: #f5f5f5;
            font-weight: 700;
            font-size: 24px;
        }
    }
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { pinyin } from 'pinyin-pro';
import ShowMap from '../ShowMap.vue';
let store = useStore();
let props = defineProps(['searchAreaClass', 'imgStateTag']);
let showMap = ref(false);
let searchKey = ref('');
let mapList = ref([]);


let hint = ref('不要输入符号 \n 可以仅输入部分文字');
//搜索
//增加防抖操作
const search = (() => {
    let timer: any = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            let list = searchMap(searchKey.value.trim().toLowerCase());//去空格、小写化
            if (list.length != 0) {
                mapList.value = list;
                showMap.value = true;
            } else {
                mapList.value = [];
                showMap.value = false;
                hint.value = '搜索失败，看看是不是打错了\n不要输入符号\n可以仅输入部分文字';
            }
        }, 300);
    }
})();


// 获取带拼音的数组
const searchList = store.state.mapList.map((item: string) => {
    // 获取数组形式不带声调的拼音 pinyin('汉语拼音', {toneType: 'none', type: 'array'}); // ["han", "yu", "pin", "yin"]
    const tail = pinyin(item, { toneType: 'none', type: 'array' }).reduce((a, b) => a + b[0], '')
    return item + tail
})

function searchMap(key: string) {
    //返回一个列表
    const ans: any = [];
    searchList.forEach((value: string, index: number) => {
        if (key != '' && value.indexOf(key) != -1) {
            ans.push(store.state.mapList[index]);
        }
    });
    return ans;
}

</script>