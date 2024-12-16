import React, { useState, useEffect } from "react";
import Index from "./Index";
import Cart from "./Cart";
import filter from "./assets/images/filter.svg";
import Customer from "./assets/images/add.svg";
import search from "./assets/images/search.svg";
function App() {
  const [table, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("table"));
    if (storedCustomers) {
      setCustomers(storedCustomers);
    }
  }, []);

  function handleDelete(index) {
    if (window.confirm("Aniq shu jadvalni o`chirasizmi???")) {
      const customCopied = table.filter((e, i) => i != index);
      setCustomers(customCopied);
      localStorage.setItem("table", JSON.stringify(customCopied));
    }
  }

  function handleClearAll() {
    if (window.confirm("Rostan ham hammasini o`chirmoqchimisiz???")) {
      setCustomers([]);
      localStorage.removeItem("table");
    }
  }

  function handleAdd(e) {
    const customCopied = [...table, e];
    setCustomers(customCopied);
    localStorage.setItem("table", JSON.stringify(customCopied));
    setShowModal(false);
  }

  return (
    <div className="max-w-[1020px] mt-6 mx-auto pt-4 shadow-md bg-[#F4F7FC]">
      <div className="flex justify-between items-center mb-4 px-4">
        <button>
          <img src={filter} alt={filter} />
        </button>
        <div className="flex gap-3 items-center bg-[#DAE1EC] p-[10px] rounded-[4px]">
          <label htmlFor="search" className="cursor-pointer">
            <img src={search} alt="" />
          </label>
          <input
            type="text"
            id="search"
            className="bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
        <button className="text-sm font-semibold text-white btn btn-primary bg-[#0A65FF] border-none" onClick={() => setShowModal(true)} >Add Customer</button>
      </div>

      <Cart table={table} handleDelete={handleDelete} />

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-semibold">Add Customer</h2>
            <Index handleAdd={handleAdd} />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
