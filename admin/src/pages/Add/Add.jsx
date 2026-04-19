import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const emptyItem = {
    name: "",
    description: "",
    price: "",
    category: "Salad",
    image: false,
  };

  const [items, setItems] = useState([{ ...emptyItem }]);

  const onChangeHandler = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const onImageChange = (index, file) => {
    const newItems = [...items];
    newItems[index].image = file;
    setItems(newItems);
  };

  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDraggingIndex(index);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggingIndex(null);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDraggingIndex(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageChange(index, e.dataTransfer.files[0]);
    }
  };

  const addItemRow = () => {
    if (items.length < 5) {
      setItems([...items, { ...emptyItem }]);
    } else {
      toast.error("You can add a maximum of 5 items at a time.");
    }
  };

  const removeItemRow = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  // API call- inserting all form data into one form data
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic Validation
    for (let i = 0; i < items.length; i++) {
        if (!items[i].image) {
            toast.error(`Please upload an image for item ${i + 1}`);
            return;
        }
    }

    const formData = new FormData();
    
    // Append arrays to formData
    // Express multer arrays require appending multiple times with the exact same key name
    items.forEach((item) => {
        formData.append("name", item.name);
        formData.append("description", item.description);
        formData.append("price", Number(item.price));
        formData.append("category", item.category);
        formData.append("images", item.image); // Key "images" matches upload.array("images", 5)
    });

    try {
        const response = await axios.post(`${url}/api/food/add`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.data.success) {
        setItems([{ ...emptyItem }]); // Reset form
        toast.success(response.data.message);
        } else {
        toast.error(response.data.message);
        }
    } catch (error) {
        toast.error("An error occurred while uploading. Please check the backend.");
        console.error(error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-header">
            <h3>Add Food Items (Max 5)</h3>
        </div>

        {items.map((item, index) => (
            <div key={index} className="add-item-row" style={{ borderBottom: "1px solid #ccc", paddingBottom: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4>Item {index + 1}</h4>
                    {items.length > 1 && (
                        <button type="button" onClick={() => removeItemRow(index)} style={{ cursor: "pointer", padding: "5px 10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "4px" }}>
                            Remove
                        </button>
                    )}
                </div>

                <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label 
                  htmlFor={`image-${index}`}
                  className={`dropzone ${draggingIndex === index ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                >
                    <img
                    src={item.image ? URL.createObjectURL(item.image) : assets.upload_area}
                    alt=""
                    style={{ width: "120px", pointerEvents: "none" }}
                    />
                    <div className="drop-hint" style={{ pointerEvents: "none" }}>Drag & Drop image here</div>
                </label>
                <input
                    onChange={(e) => onImageChange(index, e.target.files[0])}
                    type="file"
                    id={`image-${index}`}
                    hidden
                    required={!item.image}
                />
                </div>

                <div className="add-product-name flex-col">
                <p>Product name</p>
                <input
                    onChange={(e) => onChangeHandler(index, e)}
                    value={item.name}
                    type="text"
                    name="name"
                    placeholder="Type here"
                    required
                />
                </div>

                <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea
                    onChange={(e) => onChangeHandler(index, e)}
                    value={item.description}
                    name="description"
                    rows="6"
                    placeholder="Write content here"
                    required
                ></textarea>
                </div>

                <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={(e) => onChangeHandler(index, e)} name="category" value={item.category}>
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Non Veg">Non Veg</option>
                    </select>
                </div>

                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input
                    onChange={(e) => onChangeHandler(index, e)}
                    value={item.price}
                    type="Number"
                    name="price"
                    placeholder="₹ 200"
                    required
                    />
                </div>
                </div>
            </div>
        ))}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {items.length < 5 && (
                <button type="button" onClick={addItemRow} style={{ padding: "10px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", cursor: "pointer", borderRadius: "4px", flex: 1 }}>
                    + Add Another Item
                </button>
            )}
            <button type="submit" className="add-btn" style={{ flex: 1 }}>
                SUBMIT ALL
            </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
