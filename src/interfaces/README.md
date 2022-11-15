# DescuentApp-interfaces
subseccion dentro de la API de descuentapp para el manejo principal de las interfases


## Sections
### account.interface.ts
```
import mongoose from "mongoose"
```
se importa mongoose directamente de la base mongoose
```
export interface IAccount
```
se exportan los datos principales de nombre, mail, contraseña, administrador y las preferencias 
```
Gexport type AccountDocument = mongoose.Document &
```
se exportan los datos principales de nombre, mail, contraseña, administrador y las preferencias  al documento de mongoose



### bank.interface.ts
```
import mongoose from "mongoose"
```
se importa mongoose directamente de la base mongoose
```
export interface IBank
```
se exportan los datos relacionados al banco como nombre, url y los selectores correspondientes
```
export interface IBankCategory
```
se exportan los datos del banco como categoria, selector de banco y nombre de banco
```
export type BankDocument = mongoose.Document &
```
se exportan los datos relacionados al banco como nombre, url y los selectores correspondientes al documento mongoose




### discount.interface.ts
```
import mongoose from "mongoose"
```
se importa mongoose directamente de la base mongoose
```
export interface IDiscount
```
se exportan los datos de descuento; nombre, url, descripcion, detalle, banco, categoria, locacion, porcentaje, fecha y tarjetas 
```
export type DiscountDocument = mongoose.Document &
```
se exportan los datos danteriores al documento mongoose





