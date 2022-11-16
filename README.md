# Descuentalo.APP
Documentación de la interfaz de programación de las aplicaciones de Descuentalo.APP.

Credenciales:
```
{
  "email": "admin@descuentapp.com",
  "password": "$password"
}
```

## Endpoints
### 👤 Auth

- `POST api/auth/login`: Acceso con correo electrónico y contraseña.
```
Requests: 
- headers: { }
- body: { email:string, password:string }

Responses:
- BAD_REQUEST (400): Si email no es válido.
- BAD_REQUEST (400): Si password no es válido.
- NOT_FOUND (404): Si el email no está registrado.
- UNAUTHORIZED (401): Si la contraseña no coincide con el email.
- OK (200): Si el usuario está registrado y la contraseña coincide, incluye el jsonwebtoken como accessToken.
```

- `POST api/auth/signup`: Registro con nombre, correo electrónico y contraseña.
```
Requests: 
- headers: { }
- body: { name: string, email:string, password:string }

Responses:
- BAD_REQUEST (400): Si name no es válido.
- BAD_REQUEST (400): Si email no es válido.
- BAD_REQUEST (400): Si password no es válido.
- BAD_REQUEST (400): Si email está registrado.
- OK (200): Si el usuario fue registrado, incluye el jsonwebtoken como accessToken.
```

- `GET api/auth/session`: Consulta de sesión con el jwt.
```
Requests: 
- headers: { headers.authorization }
- body: { }

Responses:
- UNAUTHORIZED (401): Si token no viene incluido en headers.authorization.
- UNAUTHORIZED (401): Si token es invalido.
- OK (200): Si el token es válido, incluye { _id:string, name:string, email:string, administrator:boolean }.
```

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
