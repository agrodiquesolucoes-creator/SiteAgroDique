# Entrega — Site AgroDique Soluções

Documento para quem vai receber este projeto. Leia antes de mexer.

## O que é

Site institucional estático (HTML + CSS + JS puro, sem build, sem framework)
para a **AgroDique Soluções**, empresa de impermeabilização com geomembrana PEAD.

Foco do site: **conversão pelo WhatsApp**. Não há backend, banco de dados nem
servidor de e-mail.

## Como rodar

Basta abrir `index.html` no navegador (duplo clique).

Para desenvolver, use um servidor local para evitar bloqueios de CORS em
imagens e lightbox:

```powershell
# com Python instalado
python -m http.server 8000
# http://localhost:8000
```

## Situação atual

### Feito

- 7 páginas completas e responsivas: `index`, `sobre`, `solucoes`, `produtos`, `projetos`, `contato`, `privacidade`.
- Menu mobile, animações de rolagem, lightbox da galeria e formulário funcionando.
- Contatos corrigidos e unificados: WhatsApp **(95) 99132-3544**, e-mail
  **agrodiquesolucoes@gmail.com**, endereço na Avenida Ataide Teive, 2077.
- Atendimento declarado como **todo o Brasil** em todas as páginas.
- Botões de orçamento apontando todos para o mesmo WhatsApp.
- Seção "WhatsApp secundário" removida.
- Logo oficial padronizada em todos os cabeçalhos e rodapés.
- Página **Produtos** criada com três modelos de Tanque Redondo para piscicultura: 8 m (≈ 60.300 litros), 10 m (≈ 94.000 litros) e 12 m (≈ 135.700 litros), todos com 1,20 m de altura.
- Página **Produtos** revisada: título, texto e badge verde coerentes com "Nossos produtos".
- Imagem do card **Piscicultura** removida de "Nossas soluções" na home (a pedido do cliente).
- Duplicidades removidas: botão extra nas faixas de CTA e botão flutuante azul repetido em todas as páginas.
- Número antigo (95) 99146-5157 eliminado do site (metadados, JSON-LD e Política de Privacidade).
- 13 artes promocionais com a logo oficial aplicada em `assets/padronizadas/`.
- Verificação automática: nenhuma imagem referenciada inexistente, nenhum ID duplicado.

### Pendente

1. **Trocar artes por fotos reais das obras.** As imagens atuais são artes de
   divulgação, não fotos de projetos executados. É preciso autorização dos
   clientes antes de publicar fotos com nome/localização.
2. **Preencher o domínio** em `sitemap.xml` e `robots.txt`.
3. **Converter as imagens para WebP/AVIF.** Hoje as artes são PNG de ~3 MB cada.
4. **Confirmar textos e cores com a empresa** (pendência do PRD original).
5. **Publicar:** Netlify, Vercel ou Cloudflare Pages (arrastar a pasta) ou FTP
   para `public_html` em hospedagem tradicional. Ativar HTTPS.

## Pacotes de compartilhamento

| Arquivo | Conteúdo | Peso |
|---|---|---|
| `site-agrodique-lite.zip` | Tudo que o site usa + documentação | ~48 MB |
| `site-agrodique.zip` | Pacote completo, incluindo as artes originais | ~76 MB |

**Para um profissional que vai editar as artes, envie o pacote completo.**
Para apenas publicar ou revisar o site, o `lite` abre e funciona igual.

O que o `lite` **não** traz: as artes originais em `assets/` (raiz), que são a
matéria-prima do `scripts/padronizar-artes.ps1`. Ou seja: no pacote leve o site
roda normal, mas o script de regeneração das logos não encontra os originais.
Para editar as artes depois, use o pacote completo.

## Pontos de atenção técnicos

- **Números de telefone no código:** o número antigo **(95) 99146-5157**
  não deve voltar. O correto é **(95) 99132-3544**. O número está em várias
  páginas HTML e em `js/main.js` (`var WA_NUMBER`).
- **Nomes de arquivo com sufixo duplicado:** o Windows salvou alguns arquivos
  como `reservatorio.png.png` e `piscicultura.jpg.jpeg`. Os nomes estão
  corretamente referenciados no HTML — se renomear, atualize o `src` também.
- **Artes promocionais:** para regenerar as versões com a logo, execute
  `scripts/padronizar-artes.ps1`. Ele nunca altera os originais em `assets/`.
- **Formulário:** envia pelo WhatsApp, não por e-mail. Para envio por e-mail,
  configure Formspree ou Netlify Forms e aponte o `action` em `contato.html`.
- **Imagens grandes:** as artes em `assets/padronizadas/` e os originais em
  `assets/` ocupam a maior parte do peso do projeto.

## Contato de referência

- WhatsApp comercial: +55 95 99132-3544
- E-mail: agrodiquesolucoes@gmail.com
