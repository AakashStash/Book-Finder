import './App.css';
import { BooksProvider } from './BooksProvider';
import BooksList from './components/bookList/BooksList';

function App() {
  return (
  <>
      <BooksProvider>
        <BooksList/>
      </BooksProvider>
   </>
  );
}

export default App;
