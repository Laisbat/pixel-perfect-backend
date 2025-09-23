export type tPost = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  title: string;
  content: string;
  published?: string;
  author?: string;
  authorId?: string;
  likes?: number;
};

export type tArquivoPost = {
  id?: number;
  id_post: number;
  nome_original: string;
  tipo: string;
  descricao?: string;
  arquivo: string;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};
