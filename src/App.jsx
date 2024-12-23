import TodoList from "./TodoList.jsx";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/ErrorPage" element={<ErrorPage />} />
        <Route path="/ErrorBoundary" element={<ErrorBoundary />} />
      </Routes>
    </>
  );
};

export default App;
