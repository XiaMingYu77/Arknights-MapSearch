<template>
    <div class="content-map">
        <img :src="`/maps/${name}.jpg`" class="map" v-for="(name, index) in mapList" :key="name"/>
    </div>
</template>

<style scoped lang="less">
.content-map {
    
    .map {
        margin: 30px 0;
        width: 100%;
        object-fit: contain;
        border-radius: 20px;
    }
}
</style>

<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';

let props = defineProps(['mapList']);

</script>
