<template>
    <div>
        <!-- <GraphicLineDash/> -->
        <GraphicHistory/>
        <v-row class="mb-12 mt-8 flex justify-center align-center">
                <v-row>
                    <!-- <v-col lg="6" cols="12">
                        <GraphicColumn/>
                    </v-col>
                    <v-col lg="5" cols="12">
                        <GraphicScatter/>
                    </v-col> -->
                    <v-col lg="4" cols="12">
                        <h3>Artilheiros</h3>
                        <GraphicArtilheiro/>
                    </v-col>
                    <v-col lg="4" cols="12">
                        <h3>Líderes de assistências</h3>
                        <GraphicAssistencias/>
                    </v-col>
                    <v-col lg="4" cols="12">
                        <h3>Participações em gols</h3>
                        <GrapihcParticipacaoVue/>
                    </v-col>
                </v-row>
        </v-row>
        <!-- <v-row class="mb-12 mt-8 flex justify-center align-center">
                <v-row>
                    <v-col lg="6" cols="12">
                        <GraphicMonochrome/>
                    </v-col>
                    <v-col lg="6" cols="12">
                        <Graphic/>
                    </v-col>
                </v-row>
        </v-row>-->
    </div>
</template>

<script>
    import GraphicColumn from '@/components/GraphicColumn.vue';
    import Graphic from '@/components/Graphic.vue';
    import GraphicMonochrome from '@/components/GraphicMonochrome.vue';
    import GraphicScatter from '@/components/GraphicScatter.vue';
    import GraphicLineDash from '@/components/GraphicLineDash.vue';
    import GraphicHistory from '@/components/GraphicHistory.vue';
    import GraphicArtilheiro from '../components/GraphicArtilheiro.vue';
    import GraphicAssistencias from '../components/GraphicAssistencias.vue';
    import GrapihcParticipacaoVue from '@/components/GrapihcParticipacao.vue';

    export default {
        name: "Dashboard",
        components: {
            GraphicColumn,
            Graphic,
            GraphicMonochrome,
            GraphicScatter,
            GraphicLineDash,
            GraphicHistory,
            GrapihcParticipacaoVue,
            GraphicAssistencias,
            GraphicArtilheiro
        }
    }

</script>

<style scoped>

</style>