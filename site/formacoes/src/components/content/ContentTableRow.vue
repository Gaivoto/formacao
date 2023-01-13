<template>
    <tr class="table-row">
        <td class="image-cell">
            <router-link :to="{ name: 'Curso', params: { id: this.course.id } }">
                <img :src="this.imageUrl">
            </router-link>
        </td>
        <td>
            <router-link :to="{ name: 'Curso', params: { id: this.course.id } }">
                <p class="course-name">{{ this.course.name }}</p>
                <p>{{ this.course.description }}</p>
            </router-link>
        </td>
        <td>
            <p>{{ this.course.date }}</p>
        </td>
        <td class="column-right">
            <p>{{ this.course.subscriptions }}</p>
        </td>
        <td class="column-right">
            <p>{{ this.course.numberOfVideos }}</p>
        </td>
        <td class="column-right">
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

<style scoped>
    .table-row td {
        padding: 16px;
        vertical-align: middle;
        border: none;
    }

    .table-row img {
        width: 110px;
        height: 110px;
        object-fit: cover;
        border-radius: 8px;
    }

    .table td p {
        color: var(--light);
        margin-bottom: 0px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .table .course-name {
        color: var(--primary);
        margin-bottom: 12px;
    }

    .table .column-right {
        text-align: right;
        padding-right: 32px;
    }

    @media (max-width: 1500px) {  
        .table-row img {
            height: 90px;
            width: 90px;
        }
    }
</style>