````
# 🛒 Grocery Items Micro API and Frontend

A simple full-stack application using **Flask** for the backend API and **Vite + React + Tailwind CSS** for the frontend UI. This app allows you to create, read, update, and delete (CRUD) grocery items.

---

## 📦 Backend (Flask)

### ▶️ Running the Flask Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
````

2.  Install dependencies:

    ```bash
    pip install flask flask-cors

    ```

3.  Run the server:

    ```bash
    python app.py

    ```

### 📌 API Endpoints

Method

Endpoint

Description

GET

`/items`

Get all grocery items

POST

`/items`

Add a new item

PUT

`/items/<id>`

Update an item

DELETE

`/items/<id>`

Delete an item

**Request Body (JSON):**

```json
{
  "name": "Eggs",
  "quantity": 2,
  "price": 3.5
}
```

---

## 💻 Frontend (React + Tailwind + Vite)

### ▶️ Running the Frontend

1.  Navigate to the frontend directory:

    ```bash
    cd frontend

    ```

2.  Install dependencies:

    ```bash
    npm install

    ```

3.  Create a `.env` file:

    ```bash
    echo "VITE_API_URL=http://localhost:5000" > .env

    ```

4.  Start the dev server:

    ```bash
    npm run dev

    ```

---

## 🚀 Deployment

### Frontend (Vercel)

- Deploy your frontend by connecting the `frontend/` folder to [Vercel](https://vercel.com/).
- Make sure to set the environment variable:

  ```
  VITE_API_URL=https://your-backend-url.com

  ```

### Backend (Render, Railway, etc.)

- Deploy your Flask backend using [Render](https://render.com/), [Railway](https://railway.app/), or similar.
- Expose the `/items` routes publicly via HTTPS.

---

## ✍️ Features

- Add grocery items with name, quantity, and price
- Edit existing items
- Delete items
- View total cost of all items
- TailwindCSS-powered clean UI

---

## 📄 License

MIT
