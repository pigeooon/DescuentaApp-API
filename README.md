# Descuentalo.APP
Documentación de la interfaz de programación de las aplicaciones de [Descuentalo.APP](https://descuentalo.app/).

Credenciales:
```
{
  "email": "admin@descuentapp.com",
  "password": "$password"
}
```

## Onboarding
### Utilizando Node
Requisitos:
- Tener el puerto 3000 sin ninguna aplicación corriendo.
- Instalar como mínimo Node v16 y NPM v8.

Pasos:
1. Para instalar las dependencias correr el siguiente comando:
`npm ci`

2. Para correr la aplicación en development:
`npm run dev`

3. Para correr la aplicación en producción:
`npm run start`

## Endpoints
### 👤 Auth

#### Account interface
```
{
  _id: string;
  name: string;
  email: string;
  password: string;
  administrator: string;
  preferences: [];
}

```
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

### 🎟️ Discounts

#### Discount interface
```
{
  _id: string;
  name: string;
  img_url: string;
  description: string;
  details: string;
  category: string;
  bank: string;
  percentage: string;
  location: string;
  date: string;
  cards: [];
}
```

- `GET api/discounts/`: Consulta de todos los descuentos.
```
Requests: 
- headers: { }
- body: { }

Responses:
- NOT_FOUND (404): Si no existen descuentos en la base de datos.
- OK (200): Si existen descuentos, devuelve todas las instancias.
```

- `GET api/discounts/:id`: Consulta un descuento en específico.
```
Requests: 
- headers: { }
- params: discount._id
- body: { }

Responses:
- NOT_FOUND (404): Si no existe el descuento en la base de datos.
- OK (200): Si existe el descuento, devuelve su instancia.
```

- `GET api/discounts/featured`: Consulta de todos los descuentos destacados.
```
Requests: 
- headers: { }
- body: { }

Responses:
- NOT_FOUND (404): Si no existen descuentos destacados en la base de datos.
- OK (200): Si existen descuentos destacados, devuelve todas las instancias.
```

- `GET api/discounts/filter`: Consulta filtrada de descuentos.
```
Requests: 
- headers: { }
- body: 
{
    name?: string;
    categories?: [];
    banks?: [];
    cards?: [];
    dates?: [];
    locations?: [];
}

Los parámetros del body son opcionales. La búsqueda será en todas las coincidencias de la base de datos.
Este mismo cuerpo del body debe almacenarse en account.preferences.

Responses:
- NOT_FOUND (404): Si no existen descuentos en la base de datos.
- OK (200): Si existen descuentos que coinciden con los filtros, devuelve todas sus instancias.
```

- `GET api/discounts/:id`: Consulta un descuento en específico.
```
Requests: 
- headers: { }
- params: discount._id
- body: { }

Responses:
- NOT_FOUND (404): Si no existe el descuento en la base de datos.
- OK (200): Si existe el descuento, devuelve su instancia.
```

- `GET api/discounts/categories`: Consulta las categorías de descuentos.
```
Requests: 
- headers: { }
- body: { }

Responses:
- NOT_FOUND (404): Si no existen categorías de descuentos.
- OK (200): Si existen categorías de descuentos, devuelve todas las instancias como { name: string, ionicIcon: string }.
```

### 🏦 Banks

#### Bank interface
```
{
  name: string;
  url: string;
  img_source_url: string;
  discount_name_selector: string; 
  discount_img_url_selector: string;
  discount_description_selector: string;
  discount_details_button_selector: string;
  discount_details_selector: string;
  discount_location_selector: string;
  discount_date_selector?: string;
  discount_categories: IBankCategory[];
}
```

- `GET api/banks/list`: Consulta el listado de bancos.
```
Requests: 
- headers: { }
- body: { }

Responses:
- NOT_FOUND (404): Si no existen bancos en la base de datos.
- OK (200): Si existen bancos, devuelve todas las instancias como { name: string }.
```

- `GET api/banks`: Consulta el listado de bancos.
```
Requests: 
- headers: { headers.authorization }
- body: { }

Responses:
- UNAUTHORIZED (401): Si token de sesión es inválido.
- UNAUTHORIZED (401): Si usuario no es administrador.
- NOT_FOUND (404): Si no existen bancos en la base de datos.
- OK (200): Si existen bancos, devuelve todas las instancias.
```

- `GET api/banks/:id`: Consulta un banco en específico.
```
Requests: 
- headers: { headers.authorization }
- params: bank._id
- body: { }

Responses:
- UNAUTHORIZED (401): Si token de sesión es inválido.
- UNAUTHORIZED (401): Si usuario no es administrador.
- NOT_FOUND (404): Si no existe el bnaco en la base de datos.
- OK (200): Si existe el bancos devuelve su instancia.
```

- `POST api/banks`: Crea un banco en la base de datos.
```
Requests: 
- headers: { headers.authorization }
- body: 
{
  name: string,
  url: string,
  img_source_url: string,
  discount_name_selector: string,
  discount_img_url_selector: string,
  discount_description_selector: string,
  discount_details_button_selector: string,
  discount_details_selector: string,
  discount_location_selector: string,
  discount_date_selector?: string,
  discount_categories: IBankCategory[],
}

Responses:
- UNAUTHORIZED (401): Si token de sesión es inválido.
- UNAUTHORIZED (401): Si usuario no es administrador.
- CREATED (201): Si el banco fue creado en la base de datos, incluye la instancia del banco.
```

- `PUT api/banks/:id`: Actualiza un banco en la base de datos.
```
Requests: 
- headers: { headers.authorization }
- params: bank._id
- body: 
{
  _id: string,
  name: string,
  url: string,
  img_source_url: string,
  discount_name_selector: string,
  discount_img_url_selector: string,
  discount_description_selector: string,
  discount_details_button_selector: string,
  discount_details_selector: string,
  discount_location_selector: string,
  discount_date_selector?: string,
  discount_categories: IBankCategory[],
}

Responses:
- UNAUTHORIZED (401): Si token de sesión es inválido.
- UNAUTHORIZED (401): Si usuario no es administrador.
- RESET_CONTENT (205): Si el banco fue actualizado en la base de datos, incluye la instancia del banco.
```

- `DELETE api/banks/:id`: Elimina un banco de la base de datos.
```
Requests: 
- headers: { headers.authorization }
- params: bank._id
- body: { }

Responses:
- UNAUTHORIZED (401): Si token de sesión es inválido.
- UNAUTHORIZED (401): Si usuario no es administrador.
- RESET_CONTENT (205): Si el banco fue eliminado de la base de datos, incluye la instancia del banco eliminado.
```

### 🕷️ Scraper

- `PUT api/scraper/launch/:id`: Lanza el scraping en un banco específico.
```
Requests: 
- headers: { headers.authorization }
- params: bank._id
- body: { }

Responses:
- UNAUTHORIZED (401): Si token de sesión es inválido.
- UNAUTHORIZED (401): Si usuario no es administrador.
- OK (200): Si el scraping fue realizado con éxito, incluye metaScraping data como { bankName: string, discountsExtracted: number, affectedCategories: number}.
- INTERNAL_SERVER_ERROR (500): Si el scraping fue cancelado por algún error interno del servidor, incluye el error como { error: error }.
```
