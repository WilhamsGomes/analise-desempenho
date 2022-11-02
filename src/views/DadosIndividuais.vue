<template>
    <div>
        <v-row class="mb-12 mt-8 flex justify-center align-center">
                <v-row>
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
        <GraphicScatterIndividuais/>    
        <DataTableIndividual/>
    </div>
</template>

<script>

    import GraphicScatterIndividuais from '@/components/GraphicScatterIndividuais.vue';
    import DataTableIndividual from '../components/DataTableIndividual.vue';
    import GraphicArtilheiro from '../components/GraphicArtilheiro.vue';
    import GraphicAssistencias from '../components/GraphicAssistencias.vue';
    import GrapihcParticipacaoVue from '@/components/GrapihcParticipacao.vue';

    export default {
        name: "DadosPartida",
        components: {
            DataTableIndividual,
            GraphicArtilheiro,
            GraphicAssistencias,
            GraphicScatterIndividuais,
            GrapihcParticipacaoVue
        }
    }
</script>

<style scoped>

</style>