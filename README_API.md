API serveur pour stocker les avis (comments)

Prérequis:
- Node.js v14+ installé

Installation et démarrage (PowerShell):

```powershell
cd "c:\Users\jonas\OneDrive\Bureau\Microsoft VS Code\page web sos propre et net"
npm install
npm start
```

Le serveur écoute par défaut sur `http://localhost:3000`.

Endpoints:
- `GET /api/ping` - vérifie que l'API répond
- `GET /api/comments` - renvoie la liste des commentaires (JSON)
- `POST /api/comments` - ajoute un commentaire (JSON body), ex:
  {
    "name": "Jean",
    "text": "Très bon service",
    "rating": 5,
    "date": "04/12/2025",
    "timestamp": "2025-12-04T..."
  }

Notes:
- Les commentaires sont persistés dans `comments.json`.
- Pour production, utilisez une vraie base de données et protégez l'API (auth, rate limiting).
