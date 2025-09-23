export type tUser = {
  cod?: number;
  nome?: string;
  email?: string;
  senha?: string;
  foto_perfil?: string;
  is_primeiro_acesso?: boolean;
  is_admin?: boolean;
  is_ativo?: boolean;
  profile?: tProfile[];
  created_at?: string;
  updated_at?: string;
};

export type tProfile = {
  cod?: number;
  bio?: string;
  userId?: number;
};
