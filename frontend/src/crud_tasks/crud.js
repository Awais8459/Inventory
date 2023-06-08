// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../crud_tasks/crud.css';

// const Crud = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     price: 0,
//     description: '',
//     quantity: 0
//   });
//   const [updateProductId, setUpdateProductId] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [productCount, setProductCount] = useState(0); // New state for product count

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchProductCount(); // Fetch product count on component mount
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/products');
//       setProducts(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchProductCount = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/products/count');
//       setProductCount(response.data.count);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   const handleCreateProduct = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('image', selectedFile);
//       formData.append('name', newProduct.name);
//       formData.append('price', newProduct.price);
//       formData.append('description', newProduct.description);
//       formData.append('quantity', newProduct.quantity);

//       const response = await axios.post('http://localhost:4000/products', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setProducts([...products, response.data]);
//       setNewProduct({ name: '', price: 0, description: '', quantity: 0 });
//       setSelectedFile(null);
//       setProductCount(productCount + 1); // Update product count after successful creation
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdateProduct = async (productId) => {
//     try {
//       const productToUpdate = products.find((product) => product._id === productId);
//       if (!productToUpdate) {
//         console.error('Product not found');
//         return;
//       }

//       if (productId === updateProductId) {
//         // Only update if the form is filled
//         if (newProduct.name && newProduct.price && newProduct.description && newProduct.quantity) {
//           if (selectedFile) {
//             const formData = new FormData();
//             formData.append('image', selectedFile);
//             formData.append('name', newProduct.name);
//             formData.append('price', newProduct.price);
//             formData.append('description', newProduct.description);
//             formData.append('quantity', newProduct.quantity);

//             const response = await axios.put(`http://localhost:4000/products/${productId}`, formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data'
//               }
//             });

//             setProducts(products.map((product) => (product._id === productId ? response.data : product)));
//           } else {
//             const response = await axios.put(`http://localhost:4000/products/${productId}`, newProduct);
//             setProducts(products.map((product) => (product._id === productId ? response.data : product)));
//           }
//         }

//         setUpdateProductId('');
//         setSelectedFile(null);
//       } else {
//         setUpdateProductId(productId);
//         setNewProduct({
//           name: productToUpdate.name,
//           price: productToUpdate.price,
//           description: productToUpdate.description,
//           quantity: productToUpdate.quantity
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const handleDeleteProduct = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:4000/products/${productId}`);
//       setProducts(products.filter((product) => product._id !== productId));
//       setProductCount(productCount - 1); // Update product count after successful deletion
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="crud-container">
//       <h1>Product List</h1>
//       <h3 className="product-count">Total Products: {productCount}</h3>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             {updateProductId !== product._id ? (
//               <>
//                 <div>Name: {product.name}</div>
//                 <div>Price: ${product.price}</div>
//                 <div>Description: {product.description}</div>
//                 <div>Quantity: {product.quantity}</div>
//                 <div className="image-container">
//                   <img src={`http://localhost:4000/uploads/${product.imagePath}`} alt="Product" />
//                 </div>
//                 <button onClick={() => handleUpdateProduct(product._id)}>Update</button>
//                 <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
//               </>
//             ) : (
//               <>
//                 <div>
//                   <label>Name:</label>
//                   <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <label>Price:</label>
//                   <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <label>Description:</label>
//                   <input type="description" name="description" value={newProduct.description} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <label>Quantity:</label>
//                   <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <label>Image:</label>
//                   <input type="file" name="image" onChange={handleFileChange} />
//                 </div>
//                 <button onClick={() => handleUpdateProduct(product._id)}>Save</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//       <h2>Create New Product</h2>
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Description:</label>
//         <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Quantity:</label>
//         <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Image:</label>
//         <input type="file" name="image" onChange={handleFileChange} />
//       </div>
//       <button onClick={handleCreateProduct}>Create</button>
//     </div>
//   );
// };

// export default Crud;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../crud_tasks/crud.css';

const Crud = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    quantity: 0
  });
  const [updateProductId, setUpdateProductId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [productCount, setProductCount] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchProducts();
    fetchProductCount();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products/count');
      setProductCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('quantity', newProduct.quantity);

      const response = await axios.post('http://localhost:4000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: 0, description: '', quantity: 0 });
      setSelectedFile(null);
      setProductCount(productCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const productToUpdate = products.find((product) => product._id === productId);
      if (!productToUpdate) {
        console.error('Product not found');
        return;
      }

      if (productId === updateProductId) {
        if (newProduct.name && newProduct.price && newProduct.description && newProduct.quantity) {
          if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('description', newProduct.description);
            formData.append('quantity', newProduct.quantity);

            const response = await axios.put(`http://localhost:4000/products/${productId}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            setProducts(products.map((product) => (product._id === productId ? response.data : product)));
          } else {
            const response = await axios.put(`http://localhost:4000/products/${productId}`, newProduct);
            setProducts(products.map((product) => (product._id === productId ? response.data : product)));
          }
        }

        setUpdateProductId('');
        setSelectedFile(null);
      } else {
        setUpdateProductId(productId);
        setNewProduct({
          name: productToUpdate.name,
          price: productToUpdate.price,
          description: productToUpdate.description,
          quantity: productToUpdate.quantity
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      setProductCount(productCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="crud-container">
      <h1>Product List</h1>
      <h3 className="product-count">Total Products: {productCount}</h3>
      <div className="input-container">
        <div className="form-row">
          <label>Name:</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
        </div>
        <div className="form-row">
          <label>Price:</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
        </div>
        <div className="form-row">
          <label>Description:</label>
          <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
        </div>
        <div className="form-row">
          <label>Quantity:</label>
          <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
        </div>
        <div className="form-row">
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button onClick={handleCreateProduct}>Create</button>
      </div>
      <div className="card-container">
        {products.map((product) => (
          <div key={product._id} className="card">
            <div>Name: {product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Description: {product.description}</div>
            <div>Quantity: {product.quantity}</div>
            <div className="image-container">
              <img src={`http://localhost:4000/uploads/${product.imagePath}`} alt="Product" />
            </div>
            <div className="card-buttons">
              <button onClick={() => handleUpdateProduct(product._id)}>Update</button>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crud;
