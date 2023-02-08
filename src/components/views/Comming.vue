<template>
    <div class="content">
        <div class="title">生息演算地图查询</div>
        <button class="start-btn" @click="startSearch">开始查询</button>
    </div>
    <div class="authorMsg">
        <a href="https://github.com/XiaMingYu77/Arknights-MapSearch" target="_blank" class="githubLink link">
            <i class="github-icon"></i><span>Github</span>
        </a>
        <a href="https://www.bilibili.com/read/cv21571561?spm_id_from=333.999.0.0" target="_blank"
            class="bilibiliLink link"><i class="bilibili-icon"></i> <span>bilibili专栏</span></a>
        <span>by: 屿洺、KK、Maple</span>
    </div>
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
        background-image: linear-gradient(to bottom right, rgba(105, 122, 161) 60%, rgba(231, 182, 193) 100%);
        box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.368);
        transition: all ease-in-out 200ms;
    }

    .start-btn:active {
        transform: translate(2px, 3px);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.368);
    }
}

.authorMsg {
    position: fixed;
    right: 20px;
    bottom: 10px;
    margin: auto;
    span{
        font-size: 14px;
    }

    .link{
        margin-bottom: 5px;
        display: block;
        text-align: right;
        line-height: 28px;
        height: 28px;
    }
    .githubLink{
        .github-icon::before{
            content: "";
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }
        .github-icon{
            display: inline-block;
            background: url('../../assets/svgIcon/github.svg');
            background-size: 20px 20px;
            background-repeat: no-repeat;
            background-position: center;
            height: 28px;
            width: 28px;
        }

        span {
            vertical-align: middle;
            color: #2C2C2C;
        }

    }
    .bilibiliLink {

        .bilibili-icon::before {
            content: "";
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }

        .bilibili-icon {
            display: inline-block;
            background: url('../../assets/svgIcon/bilibili.svg');
            background-size: 20px 20px;
            background-repeat: no-repeat;
            background-position: center;
            height: 28px;
            width: 28px;
        }

        span {
            vertical-align: middle;
            color: #20B0E3;
        }
    }
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

function startSearch() {
    setTimeout(() => {
        router.push('/search');
    }, 200);
}
</script>