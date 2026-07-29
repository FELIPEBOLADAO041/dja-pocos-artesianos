# Site DJA Manutenções de Poços Artesianos

### 👉 [Ver o site](https://felipeboladao041.github.io/dja-pocos-artesianos/)

**https://felipeboladao041.github.io/dja-pocos-artesianos/**

Landing page de manutenção de poços artesianos em Curitiba e região.
Esta é a **versão 3, para aprovação do cliente**.

---

## Como está montado

Site estático, sem framework e sem backend. Abre direto no navegador.

| Arquivo | O que é |
|---|---|
| `index.html` | A página inteira |
| `styles.css` | Estilos e responsividade |
| `script.js` | Menu mobile, carrossel e formulário |
| `assets/img/` | Logo e fotos dos serviços |

O formulário não usa servidor: ele monta a mensagem com os dados preenchidos
e abre o WhatsApp **(41) 99809-0467** já com tudo escrito.

## Antes de publicar no domínio do cliente (v4)

- [ ] **Remover a linha `<meta name="robots" content="noindex, nofollow">` do `index.html`.**
      Ela existe só para esta versão de aprovação não aparecer no Google.
      Se ficar, o site nunca é encontrado em buscas.
- [ ] Trocar os 3 depoimentos `[Depoimento 1: ...]` por textos reais de clientes
- [ ] Preencher a nota e o número de avaliações do Google, e o link do perfil
- [ ] Confirmar com a DJA se pode citar CopaGás, Jockey Clube e Condomínio Iguaçu 5
      pelo nome — clientes corporativos costumam exigir autorização
