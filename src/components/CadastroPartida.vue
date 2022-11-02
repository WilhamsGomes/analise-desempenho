<template>
     <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mb-2" color="#00695C" dark v-bind="attrs" v-on="on">
                    <v-icon >
                        mdi-account-multiple-plus
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Cadastrar partida</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" >
                            <v-text-field
                                label="Adversário*"
                                required
                                v-model="timeAdversario"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="Local da partida"
                                v-model="localPartida"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="Data da partida"
                                type="date"
                                required
                                v-model="dataPartida"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" >
                            <v-text-field
                                label="Quantidade gols do Brasil"
                                type="number"
                                v-model="quantidadeGolsMandante"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" >
                            <v-text-field
                                label="Quantidade gols do adversário"
                                type="number"
                                v-model="quantidadeGolsVisitante"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                    <small>*Campos obrigatórios</small>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#00695C" text @click="dialog = false"> 
                        Fechar
                    </v-btn>
                    <v-btn color="#00695C" text @click="savePartida">
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "CadastroPartida",
        data(){
            return{
                dialog: false,
                timeAdversario: null,
                localPartida: null,
                dataPartida: null,
                quantidadeGolsMandante: null,
                quantidadeGolsVisitante: null,
            }
        },

        methods: {

            async savePartida(){

                const data = {
                    timeAdversario: this.timeAdversario,
                    localPartida: this.localPartida,
                    dataPartida: this.dataPartida,
                    quantidadeGolsMandante: this.quantidadeGolsMandante,
                    quantidadeGolsVisitante: this.quantidadeGolsVisitante
                }

                const dataJson = JSON.stringify(data);

                const req = await fetch("http://localhost:8080/historico", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                });

                alert("Partida salva com sucesso!")
                this.timeAdversario ="",
                this.localPartida ="",
                this.dataPartida ="",
                this.quantidadeGolsMandante ="",
                this.quantidadeGolsVisitante ="",
                this.dialog = false
                location.reload()

            }

        }
        
    }
</script>

<style scoped>

</style>