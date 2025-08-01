// import React, { useState } from "react";
// import axios from "axios";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     sku: "",
//     category: "Tops",
//     price: 0,
//     originalPrice: 0,
//     discountPercent: 0,
//     stock: 0,
//     sales: 0,
//     isOutOfStock: false,
//     description: "",
//     sizes: [],
//     material: "",
//     care: "",
//     origin: "",
//     fit: "",
//     averageRating: 0,
//     reviewCount: 0,
//   });

//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = new FormData();
//     images.forEach((img) => payload.append("files", img));
//     Object.entries(formData).forEach(([key, val]) => {
//       if (Array.isArray(val)) {
//         val.forEach((v) => payload.append(`${key}[]`, v));
//       } else {
//         payload.append(key, val);
//       }
//     });

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/admin/products/create",
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Product created!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create product.");
//     }
//   };
// const handleMultiSelect = (e) => {
//   const { value, checked } = e.target;
//   setFormData((prev) => {
//     const updatedSizes = checked
//       ? [...prev.sizes, value]
//       : prev.sizes.filter((size) => size !== value);
//     return { ...prev, sizes: updatedSizes };
//   });
// };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} />
//         <input name="sku" placeholder="SKU" onChange={handleChange} />
//         <input name="category" placeholder="Category" onChange={handleChange} />
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           onChange={handleChange}
//         />
//         <input
//           name="originalPrice"
//           type="number"
//           placeholder="Original Price"
//           onChange={handleChange}
//         />
//         <input
//           name="discountPercent"
//           type="number"
//           placeholder="Discount %"
//           onChange={handleChange}
//         />
//         <input
//           name="stock"
//           type="number"
//           placeholder="Stock"
//           onChange={handleChange}
//         />
//         <input
//           name="sales"
//           type="number"
//           placeholder="Sales"
//           onChange={handleChange}
//         />
//         <label>
//           Out of Stock?
//           <input name="isOutOfStock" type="checkbox" onChange={handleChange} />
//         </label>
//         <textarea
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//         />
//         <input name="material" placeholder="Material" onChange={handleChange} />
//         <input
//           name="care"
//           placeholder="Care Instructions"
//           onChange={handleChange}
//         />
//         <input name="origin" placeholder="Origin" onChange={handleChange} />
//         <input name="fit" placeholder="Fit" onChange={handleChange} />

//         <label>Sizes:</label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizes"
//             value="S"
//             onChange={handleMultiSelect}
//           />{" "}
//           S
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizes"
//             value="M"
//             onChange={handleMultiSelect}
//           />{" "}
//           M
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizes"
//             value="L"
//             onChange={handleMultiSelect}
//           />{" "}
//           L
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="sizes"
//             value="XL"
//             onChange={handleMultiSelect}
//           />{" "}
//           XL
//         </label>

//         <input type="file" multiple onChange={handleFileChange} />
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import axios from 'axios';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    sizes: [],
    stock: '',
    sku: '',
    discountPercent: '',
    sales: '',
    isOutOfStock: false,
    material: '',
    care: '',
    origin: '',
    fit: '',
    averageRating: 0,
    reviewCount: 0,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ['Outerwear', 'Shirts', 'Bottoms', 'Dresses', 'Casual', 'Tops', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    images.forEach((img) => payload.append('files', img));
    Object.entries(formData).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => payload.append(`${key}[]`, v));
      } else {
        payload.append(key, val);
      }
    });

    try {
      const res = await axios.post('http://localhost:5000/admin/products/create', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product created!');
      navigate('/admin-panel/products');
    } catch (err) {
      console.error(err);
      alert('Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin-panel/products')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-1">Create a new product for your store</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="name" placeholder="Product Name" required value={formData.name} onChange={handleChange} className="input" />
            <select name="category" required value={formData.category} onChange={handleChange} className="input">
              <option value="">Select Category</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input name="price" type="number" placeholder="Price" required value={formData.price} onChange={handleChange} className="input" />
            <input name="originalPrice" type="number" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} className="input" />
            <input name="stock" type="number" placeholder="Stock" required value={formData.stock} onChange={handleChange} className="input" />
            <input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} className="input" />
            <input name="discountPercent" type="number" placeholder="Discount %" value={formData.discountPercent} onChange={handleChange} className="input" />
            <input name="sales" type="number" placeholder="Sales" value={formData.sales} onChange={handleChange} className="input" />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isOutOfStock" checked={formData.isOutOfStock} onChange={handleChange} /> Out of Stock?
            </label>
          </div>
          <textarea name="description" placeholder="Description" required rows={4} value={formData.description} onChange={handleChange} className="input mt-4" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Sizes</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {sizes.map((size) => (
              <label key={size} className="flex items-center">
                <input type="checkbox" checked={formData.sizes.includes(size)} onChange={() => handleSizeChange(size)} className="mr-2" />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Images</h2>
          <div className="border-2 border-dashed p-6 text-center">
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p>Click to upload images</p>
            </label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded-lg" alt="preview" />
                  <button onClick={() => removeImage(i)} type="button" className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="material" placeholder="Material" value={formData.material} onChange={handleChange} className="input" />
            <input name="care" placeholder="Care Instructions" value={formData.care} onChange={handleChange} className="input" />
            <input name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} className="input" />
            <input name="fit" placeholder="Fit" value={formData.fit} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={() => navigate('/admin-panel/products')} type="button" className="px-4 py-2 border rounded-md">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
