# 🚀 Mult Service – Microserviço de Multiplicação

Este projeto implementa um microserviço de multiplicação robusto e escalável. A aplicação, desenvolvida em **Node.js com Express**, expõe um endpoint RESTful que realiza multiplicações de dois valores. Para garantir **alta disponibilidade e desempenho**, o serviço é replicado em múltiplos containers e orquestrado com **Nginx** para balanceamento de carga.

---

## 💻 Tecnologias

* **Node.js 18 + Express 5**: Ambiente e framework para o microserviço.
* **Docker e Docker Compose**: Para orquestração, build e gerenciamento dos containers.
* **Nginx**: Atua como um proxy reverso para distribuir as requisições.
* **Round Robin com Pesos**: Algoritmo de balanceamento de carga para alocar o tráfego de maneira inteligente entre os containers do serviço.

---
## ⚙️ Estrutura do Projeto

A estrutura do projeto é modular e clara, com a separação dos componentes principais:

    mult-service/
    │
    ├─ mult/               # Código-fonte do microserviço Node.js
    │   ├─ index.js        # Lógica do serviço de multiplicação
    │   ├─ package.json
    │   └─ node_modules/
    │
    ├─ nginx/              # Arquivo de configuração do Nginx
    │   └─ nginx.conf
    │
    └─ docker-compose.yml  # Definição dos serviços, redes e volumes Docker

## Tecnologias

- Node.js 18 + Express 5  
- Nginx  
- Docker e Docker Compose  
- Round Robin com pesos para balanceamento

## Como Funciona

1. **Endpoint `/mult`**:

```http
GET /mult?op1=<valor1>&op2=<valor2>
Parâmetros obrigatórios: op1 e op2 (números)

Retorno:
{
  "op1": 6,
  "op2": 7,
  "result": 42
}
```


**Balanceamento de carga**: Nginx distribui as requisições para os containers usando Round Robin com pesos: mult1: peso 3, mult2: peso 1, mult3: container backup, só recebe requisições se os outros falharem.

**Logs**: Cada requisição é registrada nos logs do container correspondente, incluindo timestamp e resultado: `[2025-09-19T23:23:40.497Z] Requisição recebida: op1=6, op2=7, result=42`

## Como Rodar

Clone o repositório: `git clone https://github.com/s4mnara/microsservico-mult.git && cd microsservico-mult`

Suba a stack Docker: `docker compose up --build -d`

Teste o endpoint (substitua pelo seu IP público): `curl "http://<SEU_IP_PUBLICO>:8080/mult?op1=6&op2=7"`

## Testes de Falha

Pare mult1: `docker stop mult1` - Observe que mult2 passa a responder todas as requisições.

Pare mult2 também: `docker stop mult2` - Agora mult3 (backup) assume o tráfego.

## Encerramento

Quando terminar os testes: `docker compose down` - Isso para e remove todos os containers e redes criadas.

## Observações

Garantir que a porta 8080 esteja aberta no Security Group da instância AWS para acesso externo. Esse microserviço foi desenvolvido para alta disponibilidade, usando múltiplos containers replicados e Nginx com balanceamento de carga.

---

*Desenvolvido por [s4mnara](https://github.com/s4mnara)*
```
