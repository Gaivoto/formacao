<template>
      <div class="app-grid__preview">
        <div class="videoInfo">
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
                <div class="titulo">
                    <p>Titulo</p>
                    <input type="text" name="username" id="username" autocomplete="off" :value="this.videoSrc.titulo">
                    <div class="duracao">
                        <p>Duração</p>
                        <p><span>{{this.videoSrc.duracao}}</span></p>
                    </div>
                </div>
                <div class="descricao">
                    <p>Descrição</p>
                    <textarea @input="updateTheVariable($event.target.value)" v-model="this.videoSrc.descricao" name="descricao" id="descricao" cols="80" rows="6"></textarea>
                </div>
            </div>
        </div>
        <div class="selector">
            <span class="drag material-icons handle">drag_indicator</span>
            <br>
            <span @click="remove" class="remove material-icons">delete</span>
        </div>
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
    background-color: var(--mobalytics-back);
    margin: 10px;
    padding: 10px 10px 6px 10px;
    border-radius: 8px;
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
    justify-content: space-between;
}
.videoInfo {
    display: flex;
}
.form{
    margin: 10px;
    display: flex;
    color: var(--primary);
    gap: 110px;
}

.duracao {
    margin-top: 68px;
}

.duracao > p {
    margin-bottom: 8px;
}

.duracao > p:last-child{
    color: white;
}

.descricao > textarea {
    border: none;
    padding: 4px 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    width: 500px;
    height: 150px;
    color: var(--light);
    background-color: var(--mobalytics-susge);
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
    resize: none;
}
.titulo > p {
    color: var(--primary);
}
.titulo > input {
    width: 500px;
    border: none;
    padding: 4px 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    color: var(--light);
    background-color: var(--mobalytics-susge);
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
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

.selector > span {
    font-size: 40px;
}
.drag {
    color: var(--primary);
}
.remove{
    margin-top: 105px;
    color: var(--light);
    cursor: pointer;
}

.snapshot-generator {
    margin: 20px;
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
    border: none;
}
</style>