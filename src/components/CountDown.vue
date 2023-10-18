<template>
    <div class="lg:hidden w-fit h-14 content-baseline flex">
        <swiper-container loop="true" effect="cube" slides-per-view="3" :centered-slides="true" @slidechange="onSlideChange($event, 'h')" direction="vertical" mousewheel="true" ref="h">
            <swiper-slide v-for="number in 24" :key="number" class="bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text text-transparent">{{ formatTime(number) }}</swiper-slide>
        </swiper-container>
        :
        <swiper-container class="" loop="true" effect="cube" slides-per-view="3" :centered-slides="true" @slidechange="onSlideChange($event, 'm')" direction="vertical" mousewheel="true" ref="m">
            <swiper-slide v-for="number in 60" :key="number" class="bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent">{{ formatTime(number) }}</swiper-slide>
        </swiper-container>
        :
        <swiper-container class="" loop="true" effect="cube" slides-per-view="3" :centered-slides="true" @slidechange="onSlideChange($event, 's')" direction="vertical" mousewheel="true" ref="s">
            <swiper-slide v-for="number in 60" :key="number" class="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">{{ formatTime(number) }}</swiper-slide>
        </swiper-container>
    </div>
    <span class="text-gray-400 dark:text-white hidden lg:block">
        <span class="bg-gradient-to-br from-pink-500 to-orange-400 bg-clip-text text-transparent">{{ hours }}</span>:<span class="bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent">{{ minutes }}</span>:<span class="bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">{{ seconds }}</span>
    </span>
</template>

<script>
export default {
    props: ['hours', 'minutes', 'seconds', 'started'],
    emits: ['changetime'],
    methods: {
        onSlideChange(e, type) {
            this.$emit('changetime', type, e.detail[0].realIndex)
        },
        formatTime(number) {
            number--
            return number < 10 ? `0${number}` : number
        }
    },
    watch: {
        started(newValue, oldValue) {
            let swiperH = this.$refs.h.swiper
            let swiperM = this.$refs.m.swiper
            let swiperS = this.$refs.s.swiper

            if (newValue) {
                swiperH.allowTouchMove = false
                swiperM.allowTouchMove = false
                swiperS.allowTouchMove = false
            } else {
                swiperH.allowTouchMove = true
                swiperM.allowTouchMove = true
                swiperS.allowTouchMove = true
            }
        },
        hours(newValue, oldValue) {
            let swiper = this.$refs.h.swiper
            swiper.slidePrev()
        },
        minutes(newValue, oldValue) {
            let swiper = this.$refs.m.swiper
            swiper.slidePrev()
        },

        seconds(newValue, oldValue) {
            let swiper = this.$refs.s.swiper
            swiper.slidePrev()
        }
    }
};
</script>

<style lang="scss" scoped>
.swiper-slide-next,
.swiper-slide-prev {
    color: #afafaf;
}
</style>