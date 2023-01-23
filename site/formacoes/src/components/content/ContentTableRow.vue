<template>
    <tr class="table-row">
        <td class="image-cell">
            <router-link :to="{ name: 'Curso', params: { id: this.course.id } }">
                <img :src="this.imageUrl">
            </router-link>
        </td>
        <td>
            <router-link :to="{ name: 'Curso', params: { id: this.course.id } }">
                <p>{{ this.course.name }}</p>
                <p>{{ this.course.description }}</p>
            </router-link>
        </td>
        <td>
            <p>{{ this.course.date }}</p>
        </td>
        <td>
            <p>{{ this.course.subscriptions }}</p>
        </td>
        <td>
            <p>{{ this.course.numberOfVideos }}</p>
        </td>
        <td>
            <p>{{ this.course.duration }}</p>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'ContentTableRow',
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: ""
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
    }
}
</script>

<style lang="scss" scoped>
    .table-row td {
        padding: 16px;
    }

    .table-row img {
        width: 120px;
        height: 120px;
        object-fit: cover;
    }
</style>