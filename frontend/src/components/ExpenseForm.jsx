import { useState } from "react";
import apiCall from "../services/api";
import { v4 as uuidv4 } from "uuid";
import Toast from "./Toast";

export default function ExpenseForm({ onSuccess }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || form.amount <= 0) {
      return setToast({ message: "Amount must be positive", type: "error" });
    }

    if (!form.date) {
      return setToast({ message: "Date required", type: "error" });
    }

     if (!form.category.trim()) {
      return setToast({ message: "Category is required", type: "error" });
    }

    try {
      setLoading(true);

      const response=await apiCall({
        url: "/expenses",
        method: "POST",
        data: form,
        idempotencyKey: uuidv4()
      });

      if (response.success) {
        setToast({ message: response.message,
        type: "success" });
      }
      else{
        setToast({ message: response.message,
        type: "error" });
      }

      setForm({
        amount: "",
        category: "",
        description: "",
        date: ""
      });
      onSuccess();
    } catch (err) {
      setToast({
        message: err || "Failed to create expense",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </>
  );
}
