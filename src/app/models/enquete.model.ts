export interface Opcao {
  id: number;
  texto_opcao: string;
  votos: number;
}

export interface Enquete {
  id: number;
  titulo: string;
  data_criacao: string;
  status: string;
  opcoes: Opcao[];
}
