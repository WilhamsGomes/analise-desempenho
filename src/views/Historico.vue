<template>
    <div class="historico">
        <v-row class="mb-12 mt-8">
                <v-row>
                    <v-col lg="8" cols="12">
                        <GraphicHistory/>
                    </v-col>
                    <v-col lg="4" cols="12">
                        <GraphicRadialBar/>
                    </v-col>
                </v-row>
        </v-row>
        <DataTableHistory/>
    </div>
</template>

<script>
    import DataTableHistory from '@/components/DataTableHistory.vue';
    import GraphicHistory from '@/components/GraphicHistory.vue';
    import GraphicRadialBar from '@/components/GraphicRadialBar.vue';

    export default {
        name: "Historico",
        components: {
            DataTableHistory,
            GraphicHistory,
            GraphicRadialBar
        }
    } 
</script>

<style scoped>

</style>