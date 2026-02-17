import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

export default function Dashboard() {
  const [tab, setTab] = useState("add");
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Expense Tracker
      </h1>

      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setTab("add")}
          className={tab === "add" ? "font-bold" : ""}
        >
          Add Expense
        </button>

        <button
          onClick={() => setTab("list")}
          className={tab === "list" ? "font-bold" : ""}
        >
          Expenses
        </button>
      </div>

      {tab === "add" && <ExpenseForm onSuccess={refresh} />}
      {tab === "list" && (
        <ExpenseList refreshKey={refreshKey} />
      )}
    </div>
  );
}
