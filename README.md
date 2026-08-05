# Site DJA Manutenções de Poços Artesianos

### 👉 https://djamanutencoes.com

Landing page de manutenção de poços artesianos em Curitiba e região.
Esta é a **versão 4 — a que está no ar**.

---

## Como está montado

Site estático, sem framework e sem backend. Hospedado na Hostinger, publicado por Git.

| Arquivo | O que é |
|---|---|
| `index.html` | A página inteira |
| `styles.css` | Estilos e responsividade |
| `script.js` | Menu mobile, carrossel, modal do vídeo e formulário |
| `assets/img/` | Logo e fotos dos serviços |
| `.htaccess` | HTTPS, compressão, cache e cabeçalhos de segurança |
| `robots.txt` / `sitemap.xml` | Indexação no Google |

O formulário não usa servidor: ele monta a mensagem com os dados preenchidos
e abre o WhatsApp **(41) 99809-0467** já com tudo escrito.

## Como publicar uma alteração

O deploy da Hostinger está ligado neste repositório, na branch `main`.

```bash
git add -A
git commit -m "descrição do que mudou"
git push
```

Depois, no hPanel → **Avançado → Git → Implantar**. (Ou configure o webhook
para publicar sozinho a cada push.)

## O que mudou da v3 para a v4

- Seção de **vídeo** entre a hero e "Problemas", com modal (o iframe do YouTube
  só carrega no clique, então não pesa no carregamento da página)
- **Avaliações reais do Google**: nota 5,0 com 39 avaliações e 3 depoimentos
  publicados, no lugar dos placeholders
- **Área de atendimento e Contato fundidas** numa única seção escura
- **Formulário** redesenhado, campos idênticos
- **Redes sociais** no rodapé (Instagram, YouTube, Google, WhatsApp)
- `noindex` removido, canonical, Open Graph, JSON-LD, robots.txt e sitemap

## Pendências

- [ ] Confirmar com a DJA se pode citar **CopaGás, Jockey Clube e Condomínio
      Iguaçu 5** pelo nome na seção "Quem já confia na DJA". Clientes
      corporativos costumam exigir autorização por escrito para uso da marca.
- [ ] Depois que o SSL estiver ativo no hPanel, descomentar as regras de
      HTTPS e www no `.htaccess`
- [ ] Cadastrar o site no Google Search Console e enviar o `sitemap.xml`
