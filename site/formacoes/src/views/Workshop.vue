<template>
    <div class="body">
        <courseInfo/>
        <div class="fileform">
        <input style="display: none" multiple="multiple" type="file" accept="video/*" @input="onFileSelected" ref="fileInput">
        <button @click="$refs.fileInput.click()">Escolher Videos</button>
        </div>
        <div v-if ="fileSelected">
            <UploadedVideoCard @remover="removerVideo" v-for="video in videoSrc" :videoSrc="video" :key="video.id"/>
        </div>
    </div>
</template>

<script scoped>
import nanoMetadata from 'nano-metadata'
import courseInfo from '../components/workshop/courseinfo.vue'
import UploadedVideoCard from '../components/workshop/UploadedVideoCard.vue'
import { v4 } from 'uuid'
export default {
    name: 'Workshop',
    components: {
        courseInfo,
        UploadedVideoCard
    },
    data () {
        return {
            selectedFile: null,
            videoSrc: [],
            existe: false,
        }
    },
    methods: {
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
                                duracao : ret
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
.body {
    width: 100%;
}
.fileform {
    margin-top: 30px;
}
</style>
