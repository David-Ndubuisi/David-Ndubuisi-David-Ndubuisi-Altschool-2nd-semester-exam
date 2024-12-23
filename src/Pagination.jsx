import React, { useEffect, useState } from "react";
import { data } from "./data";

const PaginationWithSearchAndFilter = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const newItems = [];
    setItems(data);
    setFilteredItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter and search logic
    let updatedItems = items;

    // Filter by completion status
    if (filterCompleted !== "") {
      updatedItems = updatedItems.filter(
        (item) => item.completed === (filterCompleted === "true")
      );
    }

    // Search by title
    if (searchTerm.trim() !== "") {
      updatedItems = updatedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(updatedItems);
    setCurrentPage(0); // Reset to first page on new filter/search
  }, [searchTerm, filterCompleted, items]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-green-500 text-5xl text-center">
        Todo List App by Kijeosowo
      </h1>

      {/* Search and Filter Inputs */}
      <div className="mt-5 flex justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
          className="border w-[50%] p-2 outline-none m-5"
        />
        <select
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
          className="border">
          <option value="">Filter By</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>

      {/* Items List */}
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#fff] m-5 shadow shadow-md p-3 rounded-[5px]">
              <h3 className="text-[#333] font-[500]">{item.title}</h3>
              <p className="text-[green]">
                {item.completed ? "Completed" : "Not Completed"}
              </p>
            </div>
          ))
        ) : (
          <div className="flex justify-center text-3xl">
            Eeya! Be like say you make mistake ❌
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredItems.length > itemsPerPage && (
        <div className="flex flex-col justify-center place-items-center">
          <div className="flex gap-10">
            <button onClick={handlePrev} disabled={currentPage === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}>
              Next
            </button>
          </div>
          <div>
            <p className="text-sm text-[#999]">
              Page {currentPage + 1} of {totalPages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationWithSearchAndFilter;
