<template>
   <div id="chart">
        <apexchart type="pie" :options="chartOptions" :series="series">
        </apexchart>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts'

    export default {
        name:"GraphicMonochrome",

        components: {
            apexchart: VueApexCharts,
        },

        data(){
            return{
                series: [25, 15, 44, 55, 41, 17],
                chartOptions: {
                    chart: {
                        width: '100%',
                        type: 'pie',
                    },
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    theme: {
                        monochrome: {
                            enabled: true
                        }
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                offset: -5
                            }
                        }
                    },
                    title: {
                        text: "Monochrome Pie"
                    },
                    dataLabels: {
                        formatter(val, opts) {
                            const name = opts.w.globals.labels[opts.seriesIndex]
                            return [name, val.toFixed(1) + '%']
                        }
                    },
                    legend: {
                        show: false
                    }
                },
            }
        }

    }
</script>

<style>

</style>