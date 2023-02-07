<template>
    <div class="content-map">
        <Map :src="`/maps/${name}.jpg`" class="map" v-for="(name, index) in mapList" :key="name"></Map>
    </div>
</template>

<style scoped lang="less">
.content-map {
    
    .map {
        width: 100%;
    }
}
</style>

<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';
import Map from './content/Map.vue';

let props = defineProps(['mapList']);

</script>
