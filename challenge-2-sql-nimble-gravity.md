# 🧪 Challenge 2 — SQL (Nimble Gravity)

## 📌 Objetivo

Resolver un challenge SQL conectándose a una base de datos PostgreSQL, obtener un resultado específico y enviarlo mediante un endpoint.

---

## 🔗 Endpoint Base

```
https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
```

---

## 🚀 Step 1 — Iniciar el challenge

```bash
curl -X GET "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/get-second-challenge?email=ivanlalvarez.22@gmail.com"
```

### 📥 Respuesta obtenida

* applicationId: `77917404005`
* DB Credentials:

  * host: bot-filter-challlenge.postgres.database.azure.com
  * db: postgres
  * user: readonly_user
  * password: readyonly123
  * port: 5432
  * sslmode: required

### 🧾 Respuesta completa (raw de consola)

```bash
C:\Users\ivan_>curl -X GET "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/get-second-challenge?email=ivanlalvarez.22@gmail.com
{"applicationId":"77917404005","dbCredentials":{"username":"readonly_user","password":"readyonly123","database":"postgres","host":"bot-filter-challlenge.postgres.database.azure.com","port":5432,"sslMode":"required"},"challengeDescription":"⚠️ ATENCIÓN: Tenés 30 minutos desde AHORA para completar este challenge. Si se te acaba el tiempo, no vas a poder enviar tu respuesta.\n\n--- INSTRUCCIONES ---\n\n1. Conectate a la base de datos usando las credenciales incluidas en esta respuesta (campo \"dbCredentials\").\n\n2. Vas a encontrar dos tablas:\n   - \"applicationid_merchant\": tabla pivote que asocia tu applicationId con un merchantid.\n   - \"transactions\": contiene las transacciones asociadas a cada merchantid.\n\n3. Usando tu applicationId (incluido en esta respuesta), encontrá tu merchantid en la tabla pivote y luego tus transacciones.\n\n4. Escribí una consulta SQL que obtenga: el monto máximo (amount) entre todas TUS transacciones cuya descripción (description) comience con la letra \"M\".\n\n5. Creá una cuenta en Pastebin (https://pastebin.com) y subí tu consulta SQL. La URL de la página de tu consulta debe ser incluida en el campo \"pastebinUrl\".\n\n6. Enviá un POST a /api/candidate/submit-second-challenge con el siguiente JSON:\n   {\n     \"applicationId\": \"tu applicationId (incluido en esta respuesta)\",\n     \"pastebinUrl\": \"https://pastebin.com/tu-paste\",\n     \"answer\": <el número que obtuviste>\n   }\n\n¡Éxitos!"}
```

---

## 🛠️ Step 2 — Conexión a PostgreSQL

```bash
psql "host=bot-filter-challlenge.postgres.database.azure.com port=5432 dbname=postgres user=readonly_user password=readyonly123 sslmode=require"
```

✅ Conexión exitosa:

```
postgres=>
```

---

## 🔍 Step 3 — Obtener merchantid

```sql
SELECT *
FROM applicationid_merchant
WHERE applicationid = '77917404005';
```

### 📥 Resultado

```
id  | applicationid | merchantid
----+---------------+------------
159 | 77917404005   | 3812804
```

👉 merchantid = **3812804**

---

## 📊 Step 4 — Query requerida

```sql
SELECT MAX(amount)
FROM transactions
WHERE merchantid = 3812804
  AND description LIKE 'M%';
```

### 📥 Resultado

```
max
----
644
```

👉 answer = **644**

---

## 📄 Step 5 — Subir query a Pastebin

Contenido:

```sql
SELECT MAX(amount)
FROM transactions
WHERE merchantid = 3812804
  AND description LIKE 'M%';
```

### 🔗 URL generada

```
https://pastebin.com/r1NxMHJ9
```

---

## 📤 Step 6 — Enviar respuesta

```bash
curl -X POST "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/submit-second-challenge" ^
-H "Content-Type: application/json" ^
-d "{\"applicationId\":\"77917404005\",\"pastebinUrl\":\"https://pastebin.com/r1NxMHJ9\",\"answer\":644}"
```

---

## ✅ Respuesta del servidor

```json
{ "ok": true }
```

---

## 🧠 Conclusión

* Se obtuvo correctamente el merchantid
* Se calculó el máximo amount filtrado por descripción
* Se envió la respuesta correctamente
* Challenge completado exitosamente

---

## 🏁 Estado final

✅ COMPLETADO
