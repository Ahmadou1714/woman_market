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

const ShoppingList = () => {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="shopping-list-container">
      <Header />
      <AddItemForm setItems={setItems} />
      <div className="items-container">
        <ItemList items={items} setItems={setItems} />
      </div>
      <Summary items={items} />
    </div>
  );
};

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
      quantite: parseInt(quantite, 10),
      prix: parseFloat(prix),
      total: parseInt(quantite, 10) * parseFloat(prix),
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
      <button className="add-button" onClick={handleAddItem}>
        Ajouter à la liste
      </button>
    </div>
  );
}

function ItemList({ items, setItems }) {
  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((_, id) => id !== index));
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
      {items.map((item, index) => (
        <ItemRow
          key={index}
          item={item}
          onDelete={() => handleDeleteItem(index)}
        />
      ))}
    </div>
  );
}

function ItemRow({ item, onDelete }) {
  return (
    <div className="item-row">
      <span className="col-name">{item.produit}</span>
      <span className="col-quantity">{item.quantite}</span>
      <span className="col-price">{item.prix} €</span>
      <span className="col-total">{item.total} €</span>
      <div className="col-actions">
        <button className="edit-button">
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
  const totalQuantity = items.reduce((acc, curr) => acc + curr.quantite, 0);
  const totalPrice = items.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="summary-section">
      <div className="total-items">
        Nombre total d'articles: <span>{totalQuantity}</span>
      </div>
      <div className="total-price">
        Prix total: <span>{totalPrice} €</span>
      </div>
    </div>
  );
}
