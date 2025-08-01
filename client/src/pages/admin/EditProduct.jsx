import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const baseURL = import.meta.env.VITE_API_URL;

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, authorizationtoken } = useAuth();
  const [removedImages, setRemovedImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    sizes: [],
    images: [],
    stock: "",
    sku: "",
    status: "active",
    specifications: {
      material: "",
      care: "",
      origin: "",
      fit: "",
    },
  });

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${baseURL}/products/${id}`, {
        headers: { Authorization: authorizationtoken },
      });
      console.log("Fetched product:", res.data); // 👈 Add this
      const fetchproduct = res.data;
      setProduct({
        name: fetchproduct.name || "",
        description: fetchproduct.description || "",
        price: fetchproduct.price || "",
        originalPrice: fetchproduct.originalPrice || "",
        category: fetchproduct.category || "",
        sizes: fetchproduct.sizes || [],
        images: fetchproduct.images || [],
        stock: fetchproduct.stock || "",
        sku: fetchproduct.sku || "",
        status: fetchproduct.status || "active",
        specifications: {
          material: fetchproduct.material || "",
          care: fetchproduct.care || "",
          origin: fetchproduct.origin || "",
          fit: fetchproduct.fit || "",
        },
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files) {
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)], // Append new files
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };
  console.log("Image",product.images);


  // Remove image
const removeImage = (index) => {
  const imageToRemove = product.images[index];
  if (typeof imageToRemove === "string") {
    setRemovedImages((prev) => [...prev, imageToRemove]);
  }

  setProduct((prev) => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index),
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", product.name);
    form.append("description", product.description);
    form.append("price", product.price);
    form.append("originalPrice", product.originalPrice);
    form.append("category", product.category);
    form.append("sizes", product.sizes);
    form.append("stock", product.stock);
    form.append("sku", product.sku);
    form.append("status", product.status);
    form.append("material", product.specifications.material);
    form.append("care", product.care);
    form.append("origin", product.origin);
    form.append("fit", product.fit);
    form.append("removedImages", JSON.stringify(removedImages));
    // Add images
    product.images.forEach((image) => {
      if (image instanceof File) {
        form.append("images", image);
      }
    });
    try {
      await axios.put(`${baseURL}/products/edit/${id}`, form, {
        headers: { Authorization: authorizationtoken },
      });
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, authorizationtoken]);
  useEffect(() => {
    console.log("Product state updated:", product);
  }, [product]);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
<form onSubmit={handleSubmit} className="space-y-4">

  {/* Product Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Product Name *
    </label>
    <input
      type="text"
      name="name"
      required
      value={product.name}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Description
    </label>
    <textarea
      name="description"
      value={product.description}
      onChange={handleInput}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Price */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Price
    </label>
    <input
      type="number"
      name="price"
      value={product.price}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Original Price */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Original Price
    </label>
    <input
      type="number"
      name="originalPrice"
      value={product.originalPrice}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Category */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Category
    </label>
    <input
      type="text"
      name="category"
      value={product.category}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Sizes */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Sizes (comma separated)
    </label>
    <input
      type="text"
      name="sizes"
      value={product.sizes.join(",")}
      onChange={(e) =>
        setProduct((prev) => ({
          ...prev,
          sizes: e.target.value.split(",").map((s) => s.trim()),
        }))
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Stock */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Stock
    </label>
    <input
      type="number"
      name="stock"
      value={product.stock}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* SKU */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      SKU
    </label>
    <input
      type="text"
      name="sku"
      value={product.sku}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Status */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Status
    </label>
    <select
      name="status"
      value={product.status}
      onChange={handleInput}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  {/* Specifications */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Material
    </label>
    <input
      type="text"
      name="material"
      value={product.specifications.material}
      onChange={(e) =>
        setProduct((prev) => ({
          ...prev,
          specifications: { ...prev.specifications, material: e.target.value },
        }))
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
    />

    <label className="block text-sm font-medium text-gray-700 mb-1">
      Care
    </label>
    <input
      type="text"
      name="care"
      value={product.specifications.care}
      onChange={(e) =>
        setProduct((prev) => ({
          ...prev,
          specifications: { ...prev.specifications, care: e.target.value },
        }))
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
    />

    <label className="block text-sm font-medium text-gray-700 mb-1">
      Origin
    </label>
    <input
      type="text"
      name="origin"
      value={product.specifications.origin}
      onChange={(e) =>
        setProduct((prev) => ({
          ...prev,
          specifications: { ...prev.specifications, origin: e.target.value },
        }))
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
    />

    <label className="block text-sm font-medium text-gray-700 mb-1">
      Fit
    </label>
    <input
      type="text"
      name="fit"
      value={product.specifications.fit}
      onChange={(e) =>
        setProduct((prev) => ({
          ...prev,
          specifications: { ...prev.specifications, fit: e.target.value },
        }))
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* Image Upload */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Upload Images
    </label>
    <input
      type="file"
      name="images"
      accept="image/*"
      multiple
      onChange={handleInput}
      className="block w-full text-sm text-gray-500"
    />

    {/* Preview uploaded images */}
    {product.images.length > 0 && (
      <div className="flex flex-wrap mt-2 gap-2">
        {product.images.map((img, i) => (
          <div key={i} className="relative w-20 h-20">
            <img
              src={
                typeof img === "string"
                  ? `${baseURL}/${img.replace(/\\/g, "/")}`
                  : URL.createObjectURL(img)
              }
              alt={`product-img-${i}`}
              className="object-cover w-full h-full rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Update Product
  </button>
</form>

    </div>
  );
}

export default EditProduct;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Upload, X } from 'lucide-react';
// import axios from 'axios';
// const baseURL = import.meta.env.VITE_API_URL;

// const EditProduct = () => {
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     originalPrice: '',
//     category: '',
//     sizes: [],
//     images: [],
//     stock: '',
//     sku: '',
//     status: 'active',
//     specifications: {
//       material: '',
//       care: '',
//       origin: '',
//       fit: ''
//     }
//   });

// useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`${baseURL}/products/${id}`);
//       const product = res.data;
// console.log("Fetched product:", product);

//       setFormData(prev => ({
//         ...prev,
//         name: product.name || '',
//         price: product.price || '',
//         stock: product.stock || '',
//         category: product.category || '',
//         description: product.description || '',
//         sku: product.sku || '',
//         originalPrice: product.originalPrice || '',
//         status: product.status || '',
//         sizes: product.sizes || [],
//         images: product.images || [],
//         specifications: {
//     material: product.material || '',
//     care: product.care || '',
//     origin: product.origin || '',
//     fit: product.fit || '',
//   }
//       }));
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };
//   fetchProduct();
// }, [id]);

//   const categories = ['Outerwear', 'Shirts', 'Bottoms', 'Dresses', 'Casual', 'Tops', 'Accessories'];
//   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
//   const statuss = ["Active", "Out of Stock", "Low Stock"];

//  const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.specifications) {
//       setFormData((prev) => ({
//         ...prev,
//         specifications: {
//           ...prev.specifications,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSizeChange = (size) => {
//     setFormData(prev => ({
//       ...prev,
//       sizes: prev.sizes.includes(size)
//         ? prev.sizes.filter(s => s !== size)
//         : [...prev.sizes, size]
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ...files],
//     }));
//   };

//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//     const calculateDiscountPercent = (original, current) => {
//     if (!original || original <= current) return 0;
//     return Math.round(((original - current) / original) * 100);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {

//       await axios.put(`${baseURL}/products/edit/${id}`, formData);
//       alert("Product updated successfully!");
//       navigate("/admin/products");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="mb-8">
//         <button
//           onClick={() => navigate('/admin-panel/products')}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Products
//         </button>
//         <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
//         <p className="text-gray-600 mt-1">Create a new product for your store</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 name="category"
//                 required
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price *
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 required
//                 step="0.01"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Original Price (optional)
//               </label>
//               <input
//                 type="number"
//                 name="originalPrice"
//                 step="0.01"
//                 value={formData.originalPrice}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Stock Quantity *
//               </label>
//               <input
//                 type="number"
//                 name="stock"
//                 required
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 SKU
//               </label>
//               <input
//                 type="text"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description *
//             </label>
//             <textarea
//               name="description"
//               required
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Sizes */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Sizes</h2>
//           <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
//             {sizes.map(size => (
//               <label key={size} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={formData.sizes.includes(size)}
//                   onChange={() => handleSizeChange(size)}
//                   className="mr-2 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium">{size}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Images */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Images</h2>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload Images
//             </label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 id="image-upload"
//               />
//               <label
//                 htmlFor="image-upload"
//                 className="cursor-pointer flex flex-col items-center"
//               >
//                 <Upload className="h-12 w-12 text-gray-400 mb-4" />
//                 <p className="text-sm text-gray-600">Click to upload images</p>
//               </label>
//             </div>
//           </div>

//          {formData.images.length > 0 && (
//   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//     {formData.images.map((image, index) => {
//       const imageUrl = typeof image === 'string'
//         ? `${baseURL}/${image.replace(/\\/g, '/')}` // convert path to URL
//         : URL.createObjectURL(image); // if it's a File

//       return (
//         <div key={index} className="relative">
//           <img
//             src={imageUrl}
//             alt={`Product ${index + 1}`}
//             className="w-full h-24 object-cover rounded-lg"
//           />
//           <button
//             type="button"
//             onClick={() => removeImage(index)}
//             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//           >
//             <X className="h-3 w-3" />
//           </button>
//         </div>
//       );
//     })}
//   </div>
// )}

//         </div>

//         {/* Specifications */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Material
//               </label>
//               <input
//                 type="text"
//                 name="material"
//                 value={formData.specifications.material}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Care Instructions
//               </label>
//               <input
//                 type="text"
//                 name="care"
//                 value={formData.specifications.care}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Origin
//               </label>
//               <input
//                 type="text"
//                 name="origin"
//                 value={formData.specifications.origin}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Fit
//               </label>
//               <input
//                 type="text"
//                 name="fit"
//                 value={formData.specifications.fit}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Settings */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Settings</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Status *
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Status</option>
//                 {statuss.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/admin-panel/products')}
//             className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Adding Product...' : 'Add Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;
