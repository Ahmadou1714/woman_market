import { AnimatePresence, motion } from 'framer-motion';
import { Edit3Icon, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import './App.css';

const initialItems = [
  {
    produit: 'Pommes',
    quantite: 3,
    prix: 1.5,
    total: 4.5,
  },
  {
    produit: 'Lait',
    quantite: 2,
    prix: 2,
    total: 4,
  },
];

function ShoppingList() {
  const [items, setItems] = useState(initialItems);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [formState, setFormState] = useState({
    produit: '',
    quantite: 0,
    prix: 0,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditItem = () => {
    const newItem = {
      ...formState,
      quantite: parseInt(formState.quantite),
      prix: parseFloat(formState.prix),
      total: parseInt(formState.quantite) * parseFloat(formState.prix),
    };

    if (editItemIndex) {
      setItems((prevItems) =>
        prevItems.map((item, index) =>
          index === editItemIndex ? newItem : item,
        ),
      );
      setEditItemIndex(null);
    } else {
      setItems((prevItems) => [...prevItems, newItem]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormState({ produit: '', quantite: 0, prix: 0 });
  };

  const handleEdit = (item, index) => {
    setFormState(item);
    setEditItemIndex(index);
  };

  const handleDelete = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shopping-list-container">
          <Header />
          <AddItemForm
            formState={formState}
            handleFormChange={handleFormChange}
            handleAddOrEditItem={handleAddOrEditItem}
            isEditing={editItemIndex !== null}
          />
          <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
          <Summary items={items} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ShoppingList;

function Header() {
  return (
    <header className="header">
      <h1>Woman Market</h1>
    </header>
  );
}

function AddItemForm({
  formState,
  handleFormChange,
  handleAddOrEditItem,
  isEditing,
}) {
  return (
    <div className="add-item-section">
      <input
        type="text"
        name="produit"
        placeholder="Nom du produit"
        className="input-field"
        value={formState.produit}
        onChange={handleFormChange}
      />
      <input
        type="number"
        name="quantite"
        placeholder="Quantité"
        className="input-field"
        value={formState.quantite}
        onChange={handleFormChange}
      />
      <input
        type="number"
        name="prix"
        placeholder="Prix unitaire (€)"
        className="input-field"
        value={formState.prix}
        onChange={handleFormChange}
      />
      <button
        type="submit"
        className="add-button"
        onClick={handleAddOrEditItem}
      >
        {isEditing ? 'Modifier' : 'Ajouter à la liste'}
      </button>
    </div>
  );
}

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div>
      <div className="items-header">
        <span className="col-name">Produit</span>
        <span className="col-quantity">Quantité</span>
        <span className="col-price">Prix unitaire</span>
        <span className="col-total">Total</span>
        <span className="col-actions">Actions</span>
      </div>

      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div key={index} exit={{ opacity: 0 }}>
            <ItemRow
              item={item}
              onEdit={() => onEdit(item, index)}
              onDelete={() => onDelete(index)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ItemRow({ item, onEdit, onDelete }) {
  return (
    <div className="item-row">
      <span className="col-name">{item.produit}</span>
      <span className="col-quantity">{item.quantite}</span>
      <span className="col-price">{item.prix} €</span>
      <span className="col-total">{item.total} €</span>
      <div className="col-actions">
        <button className="edit-button" onClick={onEdit}>
          <Edit3Icon size={16} />
        </button>
        <button className="delete-button" onClick={onDelete}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function Summary({ items }) {
  const totalArticle = items.reduce((acc, curr) => acc + curr.quantite, 0);
  const totalPrice = items.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="summary-section">
      <div className="total-items">
        Nombre total d'articles: <span>{totalArticle}</span>
      </div>
      <div className="total-price">
        Prix total: <span>{totalPrice} €</span>
      </div>
    </div>
  );
}
