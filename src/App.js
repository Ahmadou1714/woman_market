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
  const [editItem, setEditItem] = useState({});

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
          <AddItemForm setItems={setItems} />

          <div className="items-container">
            <ItemList
              items={items}
              setItems={setItems}
              editItem={editItem}
              setEditItem={setEditItem}
            />
          </div>
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

function AddItemForm({ setItems }) {
  const [produit, setProduit] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prix, setPrix] = useState(0);

  function resetItem() {
    setProduit('');
    setQuantite(0);
    setPrix(0);
  }

  const handleAddItem = () => {
    const newItem = {
      produit,
      quantite: parseInt(quantite),
      prix: parseFloat(prix),
      total: parseInt(quantite) * parseFloat(prix),
    };
    setItems((prev) => [...prev, newItem]);
    resetItem();
  };

  return (
    <div className="add-item-section">
      <input
        type="text"
        placeholder="Nom du produit"
        className="input-field"
        value={produit}
        onChange={(e) => setProduit(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantité"
        className="input-field"
        value={quantite}
        onChange={(e) => setQuantite(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix unitaire (€)"
        className="input-field"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
      />
      <button type="submit" className="add-button" onClick={handleAddItem}>
        Ajouter à la liste
      </button>
    </div>
  );
}

function ItemList({ items, setItems, editItem, setEditItem }) {
  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleEditItem = (produit, quantite, prix) => {
    const updateItem = setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.produit === produit) {
          return {
            ...item,
            quantite: quantite,
            prix: prix,
            total: quantite * prix,
          };
        }
        return item;
      }),
    );
    setEditItem(updateItem);
  };

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
              key={index}
              item={item}
              onDelete={() => handleDeleteItem(index)}
              onEdit={(e) => handleEditItem(item)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ItemRow({ item, onDelete, onEdit }) {
  return (
    <div className="item-row">
      <span className="col-name">{item.produit}</span>
      <span className="col-quantity">{item.quantite}</span>
      <span className="col-price">{item.prix} €</span>
      <span className="col-total">{item.total} €</span>
      <div className="col-actions">
        <button className="edit-button">
          <Edit3Icon size={16} onClick={onEdit} />
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
