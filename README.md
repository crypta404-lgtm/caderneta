# Caderneta da Claudia

Controle financeiro pessoal. Projeto de estudo, não comercial.

| Pasta | O que é | Porta local |
|---|---|---|
| `backend/` | API em Node.js com Express (JavaScript, CommonJS) | 3000 |
| `frontend/` | App em Next.js (App Router, TypeScript) | 3001 |

Ainda não há banco de dados. A lista e o dashboard usam dados de exemplo fixos.
A tela **Novo lançamento** envia para a API, que valida e confirma, mas não salva.

## Como rodar

Em dois terminais, a partir da raiz do projeto.

Back-end:

```bash
cd backend
npm install
npm start
```

Front-end:

```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:3001. No VS Code, a tarefa **Caderneta: iniciar tudo**
sobe os dois (depois do `npm install`).

## Como o front fala com o back

O formulário usa uma Server Action: o servidor do Next chama a API.
O navegador não acessa a API diretamente, por isso não é preciso CORS
e a chave de acesso não aparece no código enviado ao navegador.

## Variáveis de ambiente

| Onde | Nome | Para que serve |
|---|---|---|
| backend | `PORT` | Troca a porta (padrão 3000) |
| backend | `API_KEY` | Exige o cabeçalho `x-api-key`. Obrigatória com `NODE_ENV=production` |
| frontend | `API_URL` | Endereço da API. Obrigatória em produção |
| frontend | `API_KEY` | A mesma chave do back-end |

No front, copie `.env.example` para `.env.local`. Nunca envie chaves para o Git.

**Atenção:** o app não tem login. A chave protege a API, mas qualquer pessoa que
abrir o front publicado consegue enviar lançamentos por ele. Coloque um login
antes de gravar dados de verdade.

## Rotas da API

- `GET /health`: devolve `{ "servico": "financas-claudia", "versao": "1.0.0" }`
- `POST /lancamentos`: recebe `{ "valor": "89,05", "descricao": "padaria" }` e
  devolve 201. Erros: `valor_invalido`, `descricao_invalida`, `json_invalido` (400),
  `nao_autorizado` (401), `corpo_grande_demais` (413).
