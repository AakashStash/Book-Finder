import { useContext, useState } from "react";
import "./booksList.css";
import Spinner from "../../ui/Spinner";
import { BooksContext } from "../../BooksProvider"; 

function BooksList() {

const { books, loading, error, searchBooks } = useContext(BooksContext);

  const [filters, setFilters] = useState({
    title: "",
    author: "",
    year: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks(filters); // call the function from provider
  };
    

  return (
    <div>
      <div className="heading">
      <h2>Book Search</h2>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="title"
          placeholder="Search by Title"
          value={filters.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Search by Author"
          value={filters.author}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Search by Year"
          value={filters.year}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
  
    <div className="books-list">
     
      
      <div className="table">
          {books.length === 0 ? (
            <p>-- No Books found... --</p>
          ) :
           (
            <table>
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Title</th>
                  <th>Author Name</th>
                  <th>Published year</th>
                  <th>More Info</th>
                </tr>
              </thead>
            { loading ? (<Spinner/>) :

              <tbody>
                {books.map((books, index) => {
                  const {
                    _id,
                    title,
                    author_name,
                    first_publish_year,
                    key,
                  } = books;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{title}</td>
                      <td>{author_name}</td>
                      <td>{first_publish_year}</td>
                      <td>  <a 
            href= {`https://openlibrary.org/${key}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            More Info
          </a>  </td>
                    
                    </tr>
                  );
                })}
              </tbody>
            }

            </table>
          )}
        </div>
    </div>
 </div>
  );
}

export default BooksList;