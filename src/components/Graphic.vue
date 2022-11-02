<template>
    <div>
        <apexchart type="radar" height="350" :options="chartOptions" :series="series">
        </apexchart>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts'

    export default {
        name:"Graphic",

        data () {
            return {
                series: [{
                name: 'Atleta por posição',
                data: [3, 4, 5, 8, 8, 3],
                }],
                chartOptions: {
                    chart: {
                    height: 350,
                    type: 'radar',
                    },
                    title: {
                    text: ''
                    },
                    xaxis: {
                    categories: ['Goleiro', 'Lateral', 'Zagueiro', 'Meio-campista', 'Ponta', 'Centroavante']
                    },
                    colors: ['#004D40']
                },
                desserts: [],
            }
        },

        components: {
            apexchart: VueApexCharts,
        },
        
    }
</script>

<style>

</style>