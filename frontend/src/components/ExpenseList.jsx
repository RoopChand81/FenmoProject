import { useEffect, useState } from "react";
import apiCall from "../services/api";
import Toast from "./Toast";

export default function ExpenseList({ refreshKey }) {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiCall({
        url: "/expenses",
        method: "GET",
        params: {
          category: category || undefined,
          sort: "date_desc"
        }
      });

      if (response.success) {
        setExpenses(response.data);
      } else {
        setToast({
          message: response.message,
          type: "error"
        });
      }

    } catch (err) {
      setError(err);
      setToast({
        message: err,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [category, refreshKey]);

  const total = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div>
        <input
          placeholder="Filter by category"
          className="border p-2 mb-4"
          onChange={(e) => setCategory(e.target.value)}
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e) => (
                  <tr key={e._id}>
                    <td className="border p-2">{e.category}</td>
                    <td className="border p-2">{e.description}</td>
                    <td className="border p-2">
                      {new Date(e.date).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      ₹{(e.amount / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 font-bold">
              Total: ₹{(total / 100).toFixed(2)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
