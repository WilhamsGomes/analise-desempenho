<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mb-2" color="#00695C" dark v-bind="attrs" v-on="on">
                    <v-icon >
                        mdi-account-plus-outline
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Cadastrar atleta</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" >
                            <v-text-field
                                label="Nome do atleta*"
                                required
                                v-model="nomeAtleta"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="Apelido do atleta"
                                v-model="apelidoAtleta"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="País de nascimento"
                                required
                                v-model="paisNascimento"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="Altura do atleta"
                                v-model="alturaAtleta"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="Peso do atleta"
                                required
                                v-model="pesoAtleta"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                            <v-text-field
                                label="Data de nascimento"
                                type="date"
                                required
                                v-model="dataNascimento"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" >
                            <v-select
                                :items="['Goleiro', 'Lateral Esquerdo', 'Lateral Direito', 'Zagueiro', 'Volante', 'Meio-campo', , 'Ponta', 'Centroavante']"
                                label="Posição"
                                required
                                v-model="posicao"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" >
                            <v-select
                                :items="['Esquerda', 'Direita', 'Ambas']"
                                label="Perna preferencial"
                                required
                                v-model="pernaPreferencial"
                            ></v-select>
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
                    <v-btn color="#00695C" text @click="savePlayer">
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name:"Modal",
        data () {
            return{
                dialog: false,
                nomeAtleta: null,
                apelidoAtleta: null,
                paisNascimento: null,
                alturaAtleta: null,
                pesoAtleta: null,
                dataNascimento: null,
                posicao: null,
                pernaPreferencial: null
            }
        },

        methods: {

            async savePlayer (){

                const data = {
                    nomeAtleta: this.nomeAtleta,
                    apelidoAtleta: this.apelidoAtleta,
                    posicaoAtleta: this.posicao,
                    dtNascimentoAtleta: this.dataNascimento,
                    paisNascimentoAtleta: this.paisNascimento,
                    pernaAtleta: this.pernaPreferencial,
                    pesoAtleta: this.pesoAtleta,
                    alturaAtleta: this.alturaAtleta
                }

                const dataJson = JSON.stringify(data);

                const req = await fetch("http://localhost:8080/analise", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                });

                alert("Atleta salvo com sucesso!")
                this.nomeAtleta ="",
                this.apelidoAtleta ="",
                this.posicao ="",
                this.dataNascimento ="",
                this.paisNascimento ="",
                this.pernaPreferencial ="",
                this.pesoAtleta ="",
                this.alturaAtleta ="",
                this.dialog = false
                location.reload()

            }

        },
    }
</script>

<style>

</style>