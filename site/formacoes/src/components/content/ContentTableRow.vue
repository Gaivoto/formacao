<template>
    <tr class="table-row">
        <td class="image-cell">
            <router-link :to="Tr.i18nRoute({ name: 'Curso', params: { id: this.course.id_course, locale: Tr.guessDefaultLocale() } })">
                <img :src="this.imageUrl">
            </router-link>
        </td>
        <td>
            <router-link :to="Tr.i18nRoute({ name: 'Curso', params: { id: this.course.id_course, locale: Tr.guessDefaultLocale() } })">
                <p class="course-name">{{ this.course.course }}</p>
                <p>{{ this.course.description }}</p>
            </router-link>
        </td>
        <td>
            <p>{{ this.formatedDate }}</p>
        </td>
        <td class="column-right">
            <p>{{ this.translatedState }}</p>
        </td>
        <td class="column-right">
            <p>{{ this.rating }}</p>
        </td>
        <td class="column-right">
            <p>{{ this.course.numberOfVideos }}</p>
        </td>
        <td class="column-right">
            <p>{{ Math.floor(this.course.duration) }}h {{ Math.round((this.course.duration - Math.floor(this.course.duration)) * 60) }}min</p>
        </td>
    </tr>
</template>

<script>
import Tr from '@/i18n/translation.js'

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
    setup() {
        return { Tr };
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
    },
    computed: {
        formatedDate() {
            return this.course.date.substring(11, 19) + " " + this.course.date.substring(8, 10) + "/" + this.course.date.substring(5, 7) + "/" + this.course.date.substring(0, 4);
        },
        translatedState() {
            switch(this.course.state) {
                case "Ativo": 
                    return this.$t('states.active');
                case "Inativo": 
                    return this.$t('states.inactive');
                case "Rejeitado": 
                    return this.$t('states.rejected');
                case "Pendente": 
                    return this.$t('states.pending');
                default:
                    return "Erro";
            }
        }
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