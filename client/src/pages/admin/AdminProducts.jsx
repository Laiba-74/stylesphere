import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Eye, MoreVertical } from 'lucide-react';
const baseURL = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/products/get`);
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', 'Outerwear', 'Shirts', 'Bottoms', 'Dresses', 'Casual', 'Tops'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      alert(`Product ${id} deleted`);
    }
  };

  const filteredProducts = (products || []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory and catalog</p>
          </div>
          <Link
            to="/admin/product/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="sales">Sort by Sales</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{filteredProducts.map((product) => (
  <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    <div className="relative">
<img
  src={
    product.images?.length
      ? `${baseURL}/${product.images[0].replace(/\\/g, '/')}`
      : '/placeholder.jpg'
  }
  alt={product.name}
  className="w-full h-48 object-cover"
/>

      <div className="absolute top-2 right-2">
        <button className="bg-white p-1 rounded-full shadow-md hover:bg-gray-50">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      <div className="absolute top-2 left-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
          {product.status}
        </span>
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>SKU:</span>
          <span className="font-medium">{product.sku}</span>
        </div>
        <div className="flex justify-between">
          <span>Category:</span>
          <span>{product.category}</span>
        </div>
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-medium text-gray-900">${product.price}</span>
        </div>
        <div className="flex justify-between">
          <span>Stock:</span>
          <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock <= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
            {product.stock}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Sales:</span>
          <span className="font-medium">{product.sales}</span>
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center">
          <Eye className="h-4 w-4 mr-1" />
          View
        </button>
        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"  onClick={() => navigate(`/admin/product/edit/${product._id}`)}>
          <Edit className="h-4 w-4 mr-1"/>
          Edit
        </button>
        <button 
          onClick={() => handleDelete(product._id)}
          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
))}

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 border rounded-lg ${
                page === 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminProducts;