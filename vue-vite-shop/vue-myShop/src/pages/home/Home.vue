<template>
    <div>
        <typeNav />
        <list-container />
        <today-recommend />
        <rank />
        <like />
        <floor v-for="f in floorList" :key="f.id" :list='f'/>
        <brand />
    </div>
</template>

<script>
    import listContainer from './listContainer.vue'
    import Rank from './rank.vue'
    import TodayRecommend from './todayRecommend.vue'
    import Like from './like.vue'
    import Floor from './floor.vue'
    import Brand from './brand.vue'
import { computed, onMounted } from '@vue/runtime-core'
import store from '../../store'
    export default {
        components: { listContainer, TodayRecommend, Rank, Like, Floor, Brand},
        name: 'Home',
        setup() {
            onMounted(()=>{
                store.dispatch('reqFloorList')
                // store.dispatch('getUserInfo')
            })
            let floorList = computed(()=>{
                return store.state.home.floorList
            })
            return{
                floorList,
            }
        }
    }
</script>

<style>
</style>