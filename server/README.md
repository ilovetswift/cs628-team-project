# Pet Store Server

Simple Express server to serve pet store data from MongoDB.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Provide a `.env` file with your connection string:

   ```bash
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

3. Start the server:

   ```bash
   npm start
   ```

The server exposes `/products` to fetch the first 50 products from the `pet_store` database.
You can filter results by pet type using a `petType` query parameter, e.g. `/products?petType=dog`.

## Setup Exrpess App

1. `cd server`
2. `npm install`
3. `export MONGO_URI="mongodb+srv://cs624:cs624@cs624ty.fheakdu.mongodb.net/?retryWrites=true&w=majority&appName=CS624Ty"`
4. `npm start`

## Mongo Schema

### Categories

Each document in categories must have:

- _id: ObjectId
- name: string
- parent_id: ObjectId or null

```JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["_id", "name"],
    "properties": {
      "_id":        { "bsonType": "objectId" },
      "name":       { "bsonType": "string" },
      "parent_id": {
        "oneOf": [
          { "bsonType": "objectId" },
          { "bsonType": "null" }
        ]
      }
    }
  }
}
```

### Suppliers

Each document in suppliers must have:

- _id: ObjectId
- name: string
- contact: object with name (string), email (valid email string), phone (string)
- address (optional): object with street, city, state, zip, country (all strings)
- lead_time_days: integer ≥ 0

```JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["_id", "name", "contact", "lead_time_days"],
    "properties": {
      "_id": { "bsonType": "objectId" },
      "name": { "bsonType": "string" },
      "contact": {
        "bsonType": "object",
        "required": ["name", "email", "phone"],
        "properties": {
          "name":  { "bsonType": "string" },
          "email": {
            "bsonType": "string",
            "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
          },
          "phone": { "bsonType": "string" }
        }
      },
      "address": {
        "bsonType": "object",
        "required": ["street","city","state","zip","country"],
        "properties": {
          "street":  { "bsonType": "string" },
          "city":    { "bsonType": "string" },
          "state":   { "bsonType": "string" },
          "zip":     { "bsonType": "string" },
          "country": { "bsonType": "string" }
        }
      },
      "lead_time_days": {
        "bsonType": "int",
        "minimum": 0
      }
    }
  }
}
```

### Warehouses

Each document in warehouses must have:

- _id: ObjectId
- name: string
- location: object with lat (double) and lng (double)
- capacity: integer ≥ 0

```JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["_id", "name", "location", "capacity"],
    "properties": {
      "_id":     { "bsonType": "objectId" },
      "name":    { "bsonType": "string" },
      "location": {
        "bsonType": "object",
        "required": ["lat", "lng"],
        "properties": {
          "lat": { "bsonType": "double" },
          "lng": { "bsonType": "double" }
        }
      },
      "capacity": {
        "bsonType": "int",
        "minimum": 0
      }
    }
  }
}
```

### Products

Each document in products must have:

- pet_type: one of "dog", "cat", "small-animal", "bird", "fish", "reptile"
- sku: string
- name: string
- description: string (optional)
- category_id: ObjectId
- tags: array of strings
- variants: array of objects, each with:
- variant_id: string
- attributes: object
- price: double
- stock: int
- warehouse_id: ObjectId
- image_url: string (URL)
- supplier_ids: array of ObjectIds
- reorder_level: int ≥ 0
- created_at: date
- updated_at: date

```JSON
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "pet_type","sku","name","category_id","variants",
      "supplier_ids","reorder_level","created_at","updated_at"
    ],
    "properties": {
      "pet_type": {
        "bsonType": "string",
        "enum": ["dog","cat","small-animal","bird","fish","reptile"]
      },
      "sku":        { "bsonType": "string" },
      "name":       { "bsonType": "string" },
      "description":{ "bsonType": "string" },
      "category_id":{ "bsonType": "objectId" },
      "tags": {
        "bsonType": "array",
        "items": { "bsonType": "string" }
      },
      "variants": {
        "bsonType": "array",
        "items": {
          "bsonType": "object",
          "required": [
            "variant_id","price","stock",
            "warehouse_id","image_url"
          ],
          "properties": {
            "variant_id":   { "bsonType": "string" },
            "attributes":   { "bsonType": "object" },
            "price":        { "bsonType": "double" },
            "stock":        { "bsonType": "int" },
            "warehouse_id": { "bsonType": "objectId" },
            "image_url":    { "bsonType": "string" }
          }
        }
      },
      "supplier_ids": {
        "bsonType": "array",
        "items": { "bsonType": "objectId" }
      },
      "reorder_level": {
        "bsonType": "int",
        "minimum": 0
      },
      "created_at":  { "bsonType": "date" },
      "updated_at":  { "bsonType": "date" }
    }
  }
}
```
