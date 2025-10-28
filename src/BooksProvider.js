import { createContext, useState } from "react";
// import axios from "axios";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "https://openlibrary.org/search.json";

  const searchBooks = async (filters) => {
    // filters = { title: '', author: '', year: '' }
    try {
      setLoading(true);
      setError(null);

      // Dynamically build query parameters
      const params = new URLSearchParams();
      if (filters.title) params.append("title", filters.title);
      if (filters.author) params.append("author", filters.author);
      if (filters.year) params.append("first_publish_year", filters.year);
      if (filters.page) params.append("page", filters.page);

      const url = `${BASE_URL}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();
      setBooks(data.docs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <BooksContext.Provider
      value={{
      books, loading, error, searchBooks
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
