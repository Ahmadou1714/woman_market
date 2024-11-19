import { Edit3Icon, Trash2 } from 'lucide-react';
import React from 'react';
import './App.css';

const ShoppingList = () => {
  return (
    <div className="shopping-list-container">
      <Header />
      <AddItemForm />
      <div className="items-container">
        <ItemList />
        <ItemRow />
      </div>
      <Summary />
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

function AddItemForm() {
  return (
    <div className="add-item-section">
      <input type="text" placeholder="Nom du produit" className="input-field" />
      <input type="number" placeholder="Quantité" className="input-field" />
      <input
        type="number"
        placeholder="Prix unitaire (€)"
        className="input-field"
      />
      <button className="add-button">Ajouter à la liste</button>
    </div>
  );
}

function ItemList() {
  return (
    <div className="items-header">
      <span className="col-name">Produit</span>
      <span className="col-quantity">Quantité</span>
      <span className="col-price">Prix unitaire</span>
      <span className="col-total">Total</span>
      <span className="col-actions">Actions</span>
    </div>
  );
}

function ItemRow() {
  return (
    <>
      <div className="item-row">
        <span className="col-name">Pommes</span>
        <span className="col-quantity">3</span>
        <span className="col-price">0.50 €</span>
        <span className="col-total">1.50 €</span>
        <div className="col-actions">
          <button className="edit-button">
            <Edit3Icon size={16} />
          </button>
          <button className="delete-button">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="item-row">
        <span className="col-name">Lait</span>
        <span className="col-quantity">2</span>
        <span className="col-price">1.20 €</span>
        <span className="col-total">2.40 €</span>
        <div className="col-actions">
          <button className="edit-button">
            <Edit3Icon size={16} />
          </button>
          <button className="delete-button">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Summary() {
  return (
    <div className="summary-section">
      <div className="total-items">
        Nombre total d'articles: <span>5</span>
      </div>
      <div className="total-price">
        Prix total: <span>3.90 €</span>
      </div>
    </div>
  );
}
