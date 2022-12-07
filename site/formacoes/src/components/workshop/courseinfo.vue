<template>
  <div class="d-none">
        <div>
            <div>
                <p>Titulo</p>
                <input type="text" name="username" id="username">
            </div>
            <div>
                <p>Descrição</p>
                <textarea name="description" id="description" cols="80" rows="5"></textarea>
            </div>
            <div>
                <p>Preço</p>
                <input type="text" name="name" id="name">
            </div>
        </div>
        <div>
            <uploadfile/>
        </div>
    </div>
</template>

<script>
import uploadfile from './uploadfile.vue'
export default {
    name: 'courseinfo',
    components: {
        uploadfile
    }
}
</script>

<style>

</style>