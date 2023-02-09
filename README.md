## Tester le projet

Instaler les dépendances avec 
```
npm install
```

Il est nécessaire d'avoir un serveur mongoDB, en ligne ou local  
Vous pouvez changer ces variables dans le .env 
```
MONGO_HOST
MONGO_PORT
MONGO_DB 
EMAIL 
EMAIL_PASS 
BASE_HREF = "http://localhost:5173"
STRIPE_PUBLIC_KEY 
STRIPE_SECRET_KEY 
```

Pour démarer le projet : 
```
npm run dev
```

## bug 
Si le projet ne répond pas à l'url appelé, vous pouvez créer un nouveau projet svelte, le lancer et aller sur l'url de ce nouveau projet dans votre navigateur.  
Puis revenir sur le projet titouan-chauchard-photographie et le relancé.  

Je ne comprends pas bien ce problème, cela vient visiblement de la connexion avec la base de données, mais j'ai du mal à le résoudre sans message d'erreur. 
D'autant plus que tout fonctionne correctement une fois le projet relancé. 
