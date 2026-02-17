export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-4 border-b mb-6">
      <button
        onClick={() => setActiveTab("add")}
        className={`pb-2 ${
          activeTab === "add"
            ? "border-b-2 border-black font-semibold"
            : ""
        }`}
      >
        Add Expense
      </button>

      <button
        onClick={() => setActiveTab("list")}
        className={`pb-2 ${
          activeTab === "list"
            ? "border-b-2 border-black font-semibold"
            : ""
        }`}
      >
        Expenses
      </button>
    </div>
  );
}
