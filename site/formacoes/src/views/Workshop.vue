<template>
    <div class="workshop-wrapper">
        <div class="form-wrapper">
            <div class="form">
                <div class="header">
                <H3>Carregar Cursos</H3>
                </div>
                <courseInfo/>
                <div class="carregar-p">
                <p>Carregar videos</p>
                </div>
                <div class="fileform">
                <input style="display: none" multiple="multiple" type="file" accept="video/*" @input="onFileSelected" ref="fileInput">
                <button class="carregarVideos" @click="$refs.fileInput.click()"><span class="material-icons"> file_upload </span></button>
                <button class="enviar" @click="Enviar">Enviar</button>
                </div>
            </div>
            <div class="videos-wrapper" v-if ="fileSelected" >
                <draggable handle=".handle" v-model="videoSrc" :animation="300" ghost-class="hidden-ghost">
                    <template #item="{element: video}">
                        <UploadedVideoCard @remover="removerVideo" :videoSrc="video" :key="video.id"/>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script scoped>
import nanoMetadata from 'nano-metadata';
import courseInfo from '../components/workshop/courseinfo.vue';
import UploadedVideoCard from '../components/workshop/UploadedVideoCard.vue';
import draggable from 'vuedraggable';
import { v4 } from 'uuid';
import Tr from '@/i18n/translation.js';

export default {
    name: 'Workshop',
    components: {
        courseInfo,
        UploadedVideoCard,
        draggable
    },
    data () {
        return {
            selectedFile: null,
            videoSrc: [],
            existe: false,
        }
    },
    setup() {
        return { Tr };
    },
    created () {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type != 'creator' || this.$store.getters.getUser.id != this.$route.params.id) {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            //o request vai aqui
        }
    },
    methods: {
        Enviar(){
            console.log(this.videoSrc)
        },
        pushVideo(video){
            nanoMetadata.video.duration(video).then((duration) => {
                            let hrs = ~~(duration / 3600);
                            let mins = ~~((duration % 3600) / 60);
                            let secs = ~~duration % 60;
                            let ret=""
                            if (hrs > 0) {
                                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
                            }
                            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                            ret += "" + secs;
                            var myObj = {
                                id : v4(),
                                url : URL.createObjectURL(video),    
                                titulo : video.name.split(".")[0],
                                duracao : ret,
                                descricao: ""
                            };
                            console.log(myObj)
                            this.videoSrc.push(myObj)
                        })
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files;
            for(let titulo of this.videoSrc) {
                for(let video of this.selectedFile){
                    if(titulo.titulo.includes(video.name.split(".")[0])) {
                        this.existe = true;
                    }
                }
            }
            if(this.existe){
                console.log("existe")
                this.existe = false;  
            } else {
                console.log("Nao existe")
                for(let video of this.selectedFile){
                    this.pushVideo(video);
                }
            }
            this.$refs.fileInput.value = null;
        },
        removerVideo(id) {
            this.videoSrc = this.videoSrc.filter(video => video.id != id);
        }
    },
    computed: {
        fileSelected(){
            return(this.videoSrc.length != 0);
        },
    },
}
</script>

<style scoped>
.workshop-wrapper {
    padding: 24px 48px 24px 48px;
    gap: 24px;  
}

.carregar-p{
color: var(--light);
}
.form-wrapper {
    padding: 24px 24px 0px 24px;
    background-color: var(--mobalytics-susge);
    border-radius: 8px;
    box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
}
.form {
    padding: 24px 326px 0px 326px;
}
.fileform {
    margin-top: 20px;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
}
.hidden-ghost {
    opacity: 0;
 }

 .header{
    color: var(--primary);
    display: flex;
    justify-content: center;
    margin: 20px;
 }

 .carregarVideos{
    background: var(--mobalytics-back);
    border-radius: 8px;
    color: var(--light);
    padding-left: 1.8em;
    padding-right: 1.8em;
    padding-top: 4px;
    padding-bottom: 0px;
    cursor: pointer;
    box-shadow: #140e3199 0px 2px 10px 4px;
    border: 2px solid #08051699;
    font-size: 16px;
    height: 36px;
 }
 .carregarVideos > span {
    color: var(--primary);
 }

 .videos-wrapper{
    padding: 8px;
 }

 .enviar {
    background: var(--mobalytics-back);
    color: var(--light);
    height: 36px;
    min-width: 120px;
    border: none;
    border-radius: 8px;
    box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
    margin-bottom: 20px;
 }
</style>
