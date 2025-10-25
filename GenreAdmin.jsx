import React, { useState, useEffect } from 'react';
import { getGenres, createGenre, updateGenre, deleteGenre } from '../services/api';

const GenreAdmin = () => {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingGenre, setEditingGenre] = useState(null);
  const [showModal, setShowModal] = useState(false);  // Untuk modal edit
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingGenre) {
        await updateGenre(editingGenre.id, form);
        setEditingGenre(null);
        setShowModal(false);
      } else {
        await createGenre(form);
      }
      setForm({ name: '', description: '' });
      fetchGenres();
    } catch (error) {
      console.error('Error saving genre:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (genre) => {
    setEditingGenre(genre);
    setForm({ name: genre.name, description: genre.description });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      try {
        await deleteGenre(id);
        fetchGenres();
      } catch (error) {
        console.error('Error deleting genre:', error);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center text-white mb-4">🎨 Creative Admin - Manage Genres</h2>
      <div className="row">
        {/* Read Section - Cards */}
        <div className="col-md-8">
          <h3 className="text-white">Genres Collection</h3>
          <div className="row">
            {genres.map((genre) => (
              <div key={genre.id} className="col-md-4 mb-3">
                <div className="card shadow-sm" style={{ borderRadius: '15px', background: '#fff' }}>
                  <div className="card-body">
                    <h5 className="card-title">{genre.name}</h5>
                    <p className="card-text">{genre.description || 'No description'}</p>
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(genre)}>✏️ Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(genre.id)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Section */}
        <div className="col-md-4">
          <h3 className="text-white">Add New Genre</h3>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Genre Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Creating...' : '🚀 Create Genre'}
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
                <h5 className="modal-title">Edit Genre</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Genre Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Genre'}
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

export default GenreAdmin;