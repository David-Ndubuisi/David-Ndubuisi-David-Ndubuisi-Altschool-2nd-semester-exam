import React, { useEffect, useState } from "react";
import './App.css';
import { data } from "./data";
import { MdAdd } from "react-icons/md";

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [loading, setLoading] = useState(true);

  const [newTodo, setNewTodo] = useState(""); // For adding new items
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [editingId, setEditingId] = useState(null); // For editing items
  const [editingTitle, setEditingTitle] = useState(""); // For the edit input

  // Load initial data
  useEffect(() => {
    setItems(data);
    setFilteredItems(data);
    setLoading(false);
  }, []);

  // Filter and search logic
  useEffect(() => {
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

  // Add new item
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newItem = {
        userId: 1,
        id: items.length + 1,
        title: newTodo,
        completed: false,
      };
      setItems((prev) => [newItem, ...prev]);
      setNewTodo("");
      setIsModalOpen(false); // Close modal after adding
    }
  };

  // Delete an item
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Edit an item
  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, title: editingTitle } : item
      )
    );
    setEditingId(null);
    setEditingTitle("");
  };

  // Toggle completion status
  const toggleCompletion = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Pagination handlers
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
    <div className="body">
      <div className="flex flex-col place items-center">
        <p className="text-3xl"><h1 className="made_by">What<span className="todo-span"> To-Do List</span> App Made by Ndubuisi David</h1></p>
        <div className="flex gap-10 mt-3">
          <a
            href="/ErrorPage"
            className="bg-blue-700 text-white p-2 rounded-[5px]">
            404 Page
          </a>
          <a
            href="/ErrorBoundary"
            className="bg-blue-700 text-white p-2 rounded-[5px]">
            Error Boundary
          </a>
        </div>
      </div>

      {/* Add New Todo Button */}
      <div className="flex flex-row justify-center place-items-center mt-3">
        <button onClick={() => setIsModalOpen(true)} className="text-1xl">
          Add a New Task
        </button>
        <MdAdd className="text-[#888]" />
      </div>

      {/* Modal for Adding New Todo */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}>
          <h2 id="add-title">Add New Task to Solve</h2>
          <input
            type="text"
            placeholder="Enter to-do title..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ marginBottom: "10px", display: "block" }}
          />
          <button onClick={handleAddTodo} style={{ marginRight: "10px" }}>
            Add
          </button>
          <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-row justify-center gap-5">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-[50%] rounded-[10px] mt-3 outline-none shadow-md  length"
        />
        <select
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
          className="border bg-blue-700 text-white rounded-[10px] shadow-md p-2 h-10 mt-4">
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>

      {/* Items List */}
      <div className="mt-10 ml-5 mr-5">
        {loading ? (
          <div>Loading...</div>
        ) : currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className="mt-5 bg-white shadow-md p-3">
              {editingId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="border"
                  />
                  <button className="edit_save-cancel" onClick={handleSaveEdit}>Save</button>
                  <button className="edit_save-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="title">{item.title}</h3>
                  <p className="status">{item.completed ? "Completed" : "Not Completed"}</p>
                  <div className="options">
                    <button onClick={() => toggleCompletion(item.id)} className="text-blue-700">
                      {item.completed ? "Mark as Incomplete" : "Mark as Complete"}
                    </button>
                    <button onClick={() => handleEdit(item.id, item.title)} id="opt1" className="bg-green-500 text-white p-2 rounded-[10px] option">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} id="opt2" className="bg-red-500 text-white p-2 rounded-[10px] option">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No items found.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredItems.length > itemsPerPage && (
        <div className="footer">
          <button className="prev" onClick={handlePrev} disabled={currentPage === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}>
            Next
          </button>
          <p>
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
