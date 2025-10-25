import React, { useState, useEffect } from 'react';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from '../services/api';

const AuthorAdmin = () => {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ name: '', bio: '' });
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingAuthor) {
        await updateAuthor(editingAuthor.id, form);
        setEditingAuthor(null);
        setShowModal(false);
      } else {
        await createAuthor(form);
      }
      setForm({ name: '', bio: '' });
      fetchAuthors();
    } catch (error) {
      console.error('Error saving author:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setForm({ name: author.name, bio: author.bio });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await deleteAuthor(id);
        fetchAuthors();
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', minHeight: '100vh', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center text-white mb-4">📚 Creative Admin - Manage Authors</h2>
      <div className="row">
        {/* Read Section - Cards */}
        <div className="col-md-8">
          <h3 className="text-white">Authors Collection</h3>
          <div className="row">
            {authors.map((author) => (
              <div key={author.id} className="col-md-4 mb-3">
                <div className="card shadow-sm" style={{ borderRadius: '15px', background: '#fff' }}>
                  <div className="card-body">
                    <h5 className="card-title">{author.name}</h5>
                    <p className="card-text">{author.bio || 'No bio'}</p>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(author)}>✏️ Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(author.id)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Section */}
        <div className="col-md-4">
          <h3 className="text-white">Add New Author</h3>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Author Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Creating...' : '🚀 Create Author'}
            </button>
          </form>
        </div>
      </div>

      {/* Modal for Edit */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Author</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Author Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Bio"
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Author'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorAdmin;