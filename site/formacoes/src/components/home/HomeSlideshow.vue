<template>
    <div class="slideshow-wrapper">
        <div class="slideshow">
            <HomeSlideItem v-for="slide in this.slides" :key="slide.id" v-bind:item="slide" v-show="slide.show" class="slide"/>
        </div>
        <div class="dots">
            <span v-for="slide in this.slides" :key="slide.id" class="dot" :class="{ 'active': slide.show } " v-on:click="changeSlide(slide.id)"></span>
        </div>
    </div>
</template>

<script>
import HomeSlideItem from "./HomeSlideItem.vue";

export default {
    name: "HomeSlideshow",
    components: {
        HomeSlideItem
    },
    props: {
        slides: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentSlide: 0
        }
    },
    mounted() {
        setTimeout(this.scrollSlides, 5000);
    },
    methods: {
        scrollSlides() {
            let i;

            for(i = 0; i < this.slides.length; i++) {
                if(this.slides[i].show) break;
            }
            
            this.slides.forEach(s => s.show = false);

            if(i + 2 > this.slides.length) {
                this.currentSlide = 0;
                this.slides[0].show = true;
            } else {
                this.currentSlide = i + 1;
                this.slides[i + 1].show = true;
            }

            setTimeout(this.scrollSlides, 5000);
        },
        changeSlide(id) {
            let i;

            for(i = 0; i < this.slides.length; i++) {
                if(this.slides[i].id == id) break;
            }

            this.slides.forEach(s => s.show = false);

            this.currentSlide = i;
            this.slides[i].show = true;
        }
    }
}
</script>

<style>
    .slideshow-wrapper {
        position: relative;
    }

    .slideshow {
        margin-bottom: 24px;
    }

    .dots {
        position: absolute;
        right: 12px;
        bottom: 8px;
    }

    .dot {
        height: 10px;
        width: 10px;
        margin: 0 4px;
        background-color: #888;
        border-radius: 4px;
        display: inline-block;
        cursor: pointer;
        -webkit-transition: width 0.3s linear, background-color 0.3s linear;
        -moz-transition: width 0.3s linear, background-color 0.3s linear;
        -ms-transition: width 0.3s linear, background-color 0.3s linear;
        -o-transition: width 0.3s linear, background-color 0.3s linear;
        transition: width 0.3s linear, background-color 0.3s linear;
    }

    .active {
        width: 20px;
        background-color: var(--light);
        -webkit-transition: width 0.3s linear, background-color 0.3s linear;
        -moz-transition: width 0.3s linear, background-color 0.3s linear;
        -ms-transition: width 0.3s linear, background-color 0.3s linear;
        -o-transition: width 0.3s linear, background-color 0.3s linear;
        transition: width 0.3s linear, background-color 0.3s linear;
    }
</style>