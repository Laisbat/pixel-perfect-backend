drop schema if exists blog cascade;

create schema blog;

CREATE TABLE blog.usuarios(
	cod SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT FALSE,
	is_ativo BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE blog.posts(
	cod SERIAL PRIMARY KEY,
	titulo VARCHAR(255) NOT NULL,
	conteudo TEXT NOT NULL,
	autor INT NOT NULL REFERENCES blog.usuarios(cod) ON DELETE CASCADE,
	is_ativo BOOLEAN DEFAULT TRUE,
	likes INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL
);

/**
* Insert iniciais
*/
INSERT INTO blog.usuarios
(nome, login, senha, is_primeiro_acesso, is_admin, is_ativo, created_at)
VALUES('Suporte', 'suporte@pixel.com',
'$2a$08$0wtNVjnFrsd/XeI/N6qN8Oc.JH.skwdIakx57oDgdOoRLAPcf42Sq', true, true, true, now());
