<template>
      <div class="app-grid__preview">
        <span class="material-icons handle">drag_indicator</span>
            <VueVideoThumbnail
            :show-play-button="showPlayButton"
            :video-src="this.videoSrc.url"
            :snapshot-at-duration-percent="parseInt(snapshotPercentage, 10)"
            snapshot-scale-type="contain"
            :snapshot-format="snapshotFormat"
            background-fill-color="black"
            :snapshot-quality="parseFloat(snapshotQuality, 10)"
            :width="parseInt(snapshotWidth, 10)"
            :height="parseInt(snapshotHeight, 10)"
            :chunks-quantity="10"
            @sizeChanged="(value) => snapshotSize = value"
            >
            <template #snapshot="{snapshot}">
                <img
                v-if="snapshot"
                :src="snapshot"
                alt="snapshot"
            >
            </template>
        </VueVideoThumbnail>
        <div class="form">
            <div>
                <p>Titulo</p>
                <input type="text" name="username" id="username" :value="this.videoSrc.titulo">
                <div>
                    <p>Duração</p>
                    <p><span>{{this.videoSrc.duracao}}</span></p>
                </div>
            </div>
            <div class="descricao">
                <p>Descrição</p>
                <textarea @input="updateTheVariable($event.target.value)" v-model="this.videoSrc.descricao" name="descricao" id="descricao" cols="80" rows="6"></textarea>
            </div>
        </div>
        <button @click="remove">X</button>
      </div>
</template>
<script>
import VueVideoThumbnail from '../VueVideoThumbnail.vue';
export default {
    name: 'UploadedVideoCard',
    components: { VueVideoThumbnail },
    props :  {
        videoSrc: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            snapShotSrc: null,
            snapshotHeight: 200,
            snapshotWidth: 200,
            snapshotPercentage: 50,
            snapshotQuality: 0.8,
            snapshotFormat: 'image/jpeg',
            snapshotSize: 0,
            showPlayButton: false,
            preview: null,
        }
    },
    methods: {
        remove() {
        this.$emit('remover', this.videoSrc.id)
        },
        updateTheVariable(value){
         this.videoSrc.descricao = value;
        },
    }
}
</script>

<style scoped>
.app-grid__preview{
    display: flex;
    background-color: pink;
    margin: 10px;
    padding: 10px 10px 6px 10px;
}
.form{
    margin: 10px;
    display: flex;
}
.descricao {
    margin-left: 10px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 10px;
  font-size: 32px;
  cursor: pointer;
  height: fit-content;
}
</style>