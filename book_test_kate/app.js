const http = require('http');

const port = process.env.PORT || 8080;

// Пожелание Кате — можно легко поменять текст здесь
const wish = {
  title: 'Спокойной ночи, Катя! 🌙',
  lines: [
    'Пусть сны будут такими же яркими, как твои идеи.',
    'Отдыхай — завтра снова покорять алгоритмы и ленты.',
    'Я верю в тебя как в блогера. По-настоящему.',
    'Ты уже звезда. Осталось только это заметить. ✨'
  ]
};

const html = (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = userAgent.includes('Mozilla');

  // Если зашли через браузер — отдаём красивую страницу
  if (isBrowser) {
    const page = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${wish.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: radial-gradient(circle at 20% 20%, #2a1a4a, #0d0a1a 60%);
      color: #f0eaff;
      padding: 24px;
    }
    .card {
      max-width: 640px;
      width: 100%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 24px;
      padding: 40px 36px;
      backdrop-filter: blur(12px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
      text-align: center;
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    h1 {
      font-size: clamp(1.6rem, 5vw, 2.4rem);
      margin-bottom: 24px;
      background: linear-gradient(90deg, #c8a2ff, #ff9ecd, #8ec5ff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 14px;
      color: #d9ccf5;
    }
    p:last-child { margin-bottom: 0; }
    .moon {
      font-size: 3rem;
      display: block;
      margin-bottom: 18px;
      animation: glow 3s ease-in-out infinite;
    }
    @keyframes glow {
      0%, 100% { filter: drop-shadow(0 0 6px #c8a2ff); }
      50% { filter: drop-shadow(0 0 22px #ff9ecd); }
    }
  </style>
</head>
<body>
  <main class="card">
    <span class="moon">🌙</span>
    <h1>${wish.title}</h1>
    ${wish.lines.map((line) => `<p>${line}</p>`).join('\n    ')}
  </main>
</body>
</html>`;

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end(page);
    return;
  }

  // Для curl / терминала — текстовый ответ
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(`🌙 ${wish.title}\n\n${wish.lines.join('\n')}\n\n— я верю в тебя как в блогера\n`);
};

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }
  html(req, res);
});

server.listen(port, () => {
  console.log(`🌙 Спокойной ночи, Катя! Сервер слушает на http://localhost:${port}`);
});
