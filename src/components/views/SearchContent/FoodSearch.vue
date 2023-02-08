<template>
    <div class="foodList">
        <Foods :src="'/Foods/菜谱1.jpg'" :imgStateTag="imgStateTag"></Foods>
        <Foods :src="'/Foods/菜谱2.jpg'" :imgStateTag="imgStateTag"></Foods>
    </div>
</template>

<style lang="less" scoped>
.foodList {
    width: 100%;
    padding: 0 20px;
}
</style>

<script lang="ts" setup>
import Foods from '../content/Foods.vue';

let props = defineProps(['imgStateTag']);
</script>