# DescuentApp
API de DescuentApp, una aplicación para obtener descuentos de los Bancos Chilenos.

Credenciales: 
"email": "admin@descuentapp.com",
"password": "$password"

## Endpoints
### Discounts
```
GET api/discounts/
GET api/discounts/:id
```

### Banks
```
GET api/banks/ [loggeado, administrador]
GET api/banks/list
GET api/banks/:id [loggeado, administrador]
POST api/banks/ [loggeado, administrador]
PUT api/banks/:id [loggeado, administrador]
DELETE api/banks/:id [loggeado, administrador]

```

## Scraper
```
GET /scraper/launch [loggeado, administrador]
```