<template>
    <div class="content">
        <img src="/backicon.png" class="headImg" />

        <div class="scrollArea" @scroll="scroll">
            <div class="black"></div>

            <div ref="topElement"></div>
            <div class="serch-place">

                <div :class="searchArea">
                    <div class="search">
                        <input type="text" v-model="searchKey" />
                        <button class="search-btn" @click="search">搜索</button>
                    </div>
                </div>
                <ShowMap v-if="showMap" :mapList="mapList" class="maplist"></ShowMap>
                <div class="empty" v-if="!showMap">
                    <div class="text">{{ hint }}</div>
                </div>
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

        .black {
            min-height: 200px;
        }

        .serch-place {
            flex: 1;
            // background-color: gray;
            width: 100%;
            border-radius: 20px 20px 0 0;
            padding: 60px 20px 0 20px;  //padding-top多留40px给搜索栏让位置
            background-image: linear-gradient(to bottom right, rgba(105, 122, 161) 40%, rgba(231, 182, 193) 100%);
            position: relative; //search-area 为absolute就会跟着跑，为fixed就会驻留
            

            .search-area {
                z-index: 100;

                position: absolute;
                top: 20px;
                left: 0;
                right: 0;
                padding: 0 20px;

                .search {
                    width: 100%;

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
                        outline: 0;
                        border: 0;
                        cursor: pointer;
                        overflow: hidden;
                        transition: background-color .25s;
                    }

                    .search-btn:hover {
                        background-color: #FFDC01;
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

            .search-area-stay{
                .search-area();
                position: fixed;
            }
        }
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
import { isFunction } from '@vue/shared';
import { ref, watch, nextTick } from 'vue';
import ShowMap from './ShowMap.vue'
import { useStore } from 'vuex'

let store = useStore();
let showMap = ref(false);
let searchKey = ref('');
let mapList = ref([]);

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
                console.log(top);
                if (top > 0) {
                    if(searchArea.value!='search-area'){
                        searchArea.value = 'search-area'
                    }
                } else {
                    if(searchArea.value!='search-area-stay'){
                        searchArea.value = 'search-area-stay'
                    }
                }
                ticked = false;
            });
        }
    };
})();


let hint = ref('不要输入符号 \n 可以仅输入部分文字');

//搜索
function search() {
    reset(); //要重置前面的参数
    let list = searchMap(searchKey.value);
    if (list.length != 0) {
        mapList.value = list;
        showMap.value = true;
    } else {
        mapList.value = [];
        showMap.value = false;
        hint.value = '搜索失败，看看是不是打错了\n不要输入符号\n可以仅输入部分文字';
    }
}
function reset() {

}

function searchMap(key: string) {
    //返回一个列表
    let ans: any = [];
    store.state.mapList.forEach((value: string) => {
        if (key != '' && value.indexOf(key) != -1) ans.push(value);
    });
    return ans;
}
</script>