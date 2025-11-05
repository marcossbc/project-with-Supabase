import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Article from "./Pages/Articale";
import Articles from "./Pages/Articales";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./Pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticleEditorPage from "./Pages/ArticleEditorPage";
import { Toaster } from "react-hot-toast";
import UnAuthCreatedRoute from "./components/UnAuthcreatedRoute";
import ManageArticlesPage from "./Pages/manageArticalesPage";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />

            <Route
              path="/signUp"
              element={
                <UnAuthCreatedRoute>
                  <SignUp />
                </UnAuthCreatedRoute>
              }
            />
            <Route
              path="/signIn"
              element={
                <UnAuthCreatedRoute>
                  <SignIn />
                </UnAuthCreatedRoute>
              }
            />

            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <ArticleEditorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editor/:id"
              element={
                <ProtectedRoute>
                  <ArticleEditorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-articles"
              element={
                <ProtectedRoute>
                  <ManageArticlesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* 404 catch-all */}
            <Route path="*" element={<div>404 — Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
