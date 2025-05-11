import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      quantity: parseInt(form.quantity),
      price: parseFloat(form.price),
    };

    if (editingId) {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const updated = await res.json();
      setItems(items.map((item) => (item.id === updated.id ? updated : item)));
      setEditingId(null);
    } else {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const newItem = await res.json();
      setItems([...items, newItem]);
    }

    setForm({ name: "", quantity: "", price: "" });
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, quantity: item.quantity, price: item.price });
    setEditingId(item.id);
  };

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Grocery List
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Item name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </form>

        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-3 rounded-md bg-gray-50">
              <div>
                <p className="font-semibold text-stone-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} | ${item.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline text-sm">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline text-sm">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-right font-bold pt-2 border-t">
          Total: ${total}
        </div>
      </div>
    </div>
  );
}

export default App;
