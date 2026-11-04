# Site Institucional — AgroDique Soluções

Site moderno, responsivo e focado em conversão pelo WhatsApp, desenvolvido a partir do PRD v1.0.

## Como visualizar

Basta abrir o arquivo `index.html` em qualquer navegador (duplo clique). Não é preciso instalar nada.

Para um resultado melhor durante o desenvolvimento, use um servidor local simples:

```
# na pasta do projeto, com Python instalado:
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Dados comerciais atuais

| Campo | Valor |
|---|---|
| WhatsApp comercial | **+55 95 99132-3544** (`https://wa.me/5595991323544`) |
| E-mail | **agrodiquesolucoes@gmail.com** |
| Endereço | Avenida Ataide Teive, 2077 — Liberdade, Boa Vista — RR |
| Área de atendimento | **Todo o Brasil** |

> O número antigo (95) 99146-5157 **não deve voltar** ao site.

## Estrutura

| Arquivo | Página |
|---|---|
| `index.html` | Página inicial (hero, empresa, soluções, pilares, projetos, CTA) |
| `sobre.html` | Sobre nós (história, propósito, segmentos) |
| `solucoes.html` | Soluções detalhadas (reservatórios, piscicultura, PEAD, agroindústria) |
| `produtos.html` | Produtos (tanque redondo para piscicultura) |
| `projetos.html` | Portfólio com galeria e visualização ampliada (lightbox) |
| `contato.html` | Formulário + informações comerciais |
| `privacidade.html` | Política de privacidade (LGPD) |
| `css/style.css` | Estilo completo (paleta, tipografia, animações, responsivo) |
| `js/main.js` | Menu mobile, animações de rolagem, lightbox e formulário |
| `assets/` | Imagens originais + `logo-agrodique.png.png` |
| `assets/padronizadas/` | Artes com a logo oficial aplicada (as que o site usa) |
| `scripts/padronizar-artes.ps1` | Regenera as versões em `assets/padronizadas/` |
| `sitemap.xml` / `robots.txt` | Arquivos de SEO (preencher o domínio) |

### Padrão de logo

A logo oficial é `assets/logo-agrodique.png.png` e é usada em **todos** os
cabeçalhos e rodapés (`.logo-image` no CSS). As artes promocionais receberam
a mesma logo sobre fundo branco em `assets/padronizadas/`.

Para alterar as artes, edite as caixas no topo de `scripts/padronizar-artes.ps1`
e execute:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/padronizar-artes.ps1
```

Os arquivos originais em `assets/` nunca são modificados.

## Antes de publicar — checklist

1. **Substituir as artes promocionais por fotos reais das obras.**
   Hoje as imagens são artes de divulgação. Quando houver autorização dos
   clientes, troque o `src` do `<img>` pela foto real em WebP/AVIF:

   ```html
   <img src="assets/fotos/reservatorio-01.webp"
        alt="Reservatório de água rural impermeabilizado com geomembrana PEAD"
        width="800" height="520" loading="lazy">
   ```

   Use fotos em alta resolução, convertidas para **WebP** ou **AVIF**.

2. **Confirmar os serviços e textos** com a empresa antes da publicação (item do PRD).

3. **Preencher o domínio** em `sitemap.xml` e `robots.txt` (substituir `https://SEU-DOMINIO.com.br`).

4. **Validar as cores** com os arquivos originais da marca (o PRD pede confirmação dos HEX).

5. **Otimizar as imagens.** As artes em `assets/padronizadas/` são PNG de ~3 MB
   cada. Converter para WebP reduz bastante o peso antes de publicar.

## Como funciona o formulário de contato

O formulário valida os dados, mostra o consentimento LGPD e, ao enviar, **abre o WhatsApp
comercial com a mensagem formatada** (nome, telefone, e-mail, serviço e mensagem).
Assim funciona sem servidor de e-mail e chega direto ao comercial.

- Número usado: **+55 95 99132-3544** (`https://wa.me/5595991323544`)
- Mensagem padrão do site: "Olá! Conheci a AgroDique pelo site e gostaria de solicitar um orçamento para meu projeto."
- Proteção anti-spam: campo oculto (honeypot) + validação no cliente.

**Alternativa por e-mail:** se preferir enviar por e-mail, crie uma conta no
[Formspree](https://formspree.io) ou use *Netlify Forms* (gratuito) e aponte o
`action` do formulário em `contato.html` para o endpoint gerado.

## Hospedagem

Por ser um site estático (HTML/CSS/JS), funciona em qualquer hospedagem:

- **Netlify / Vercel / Cloudflare Pages** (gratuitas, com HTTPS automático) — arraste a pasta e pronto.
- **Hostinger, HostGator, Locaweb** — envie os arquivos via FTP para a pasta `public_html`.
- Ative o **certificado HTTPS** (a maioria dos hosts grátis já oferece).

## SEO e desempenho

- Títulos e descrições únicos por página ✔
- Dados estruturados `LocalBusiness` na home ✔
- `sitemap.xml` e `robots.txt` ✔
- Imagens com texto alternativo e carregamento lazy ✔
- Animações respeitando `prefers-reduced-motion` ✔

Próximos passos sugeridos: registrar domínio, configurar Google Search Console
e Google Analytics 4 (medição de cliques no WhatsApp e formulários).
