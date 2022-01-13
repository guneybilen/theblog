import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import { Route, Routes } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="The Blog" />
      <Nav />
      {/* <DataProvider> */}
      <Routes>
        <Route
          path="/"
          exact
          element={<Home fetchError={fetchError} isLoading={isLoading} />}
        />
        <Route path="/post" exact element={<NewPost />} />
        <Route path="/edit/:id" exact element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
}

export default App;
