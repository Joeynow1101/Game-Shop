import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import ShopForm from "./ShopForm";
import { loadFromLocal, saveToLocal } from "./lib/localStorage";

function App() {
  const localStorageProducts = loadFromLocal("_products");
  const localStorageFavouriteProducts = loadFromLocal("_favouriteProducts");

  const [products, setProducts] = useState(localStorageProducts ?? []);
  const [favouriteProducts, setFavouriteProducts] = useState(
    localStorageFavouriteProducts ?? []
  );

  useEffect(() => {
    saveToLocal("_products", products);
  }, [products]);

  useEffect(() => {
    saveToLocal("_favouriteProducts", favouriteProducts);
  }, [favouriteProducts]);

  const addProduct = (product) => setProducts([...products, product]);

  function isProductInListOfFavourites(favouriteProductToAdd) {
    return favouriteProducts.some(
      (everyFavouriteProduct) =>
        everyFavouriteProduct.id === favouriteProductToAdd.id
    );
  }

  function removeProductFromListOfFavourites(product) {
    return favouriteProducts.filter(
      (everyFavouriteProduct) => everyFavouriteProduct.id !== product.id
    );
  }

  function addToFavourites(favouriteProductToAdd) {
    // Produkt ist schon auf der Liste der Favourites => Entfernen!
    if (isProductInListOfFavourites(favouriteProductToAdd)) {
      const favouritesToKeep = removeProductFromListOfFavourites(
        favouriteProductToAdd
      );
      setFavouriteProducts(favouritesToKeep);
    } else {
      // Produkt ist noch NICHT auf der Liste der Favourites => Hinzufügen!
      setFavouriteProducts([...favouriteProducts, favouriteProductToAdd]);
    }
  }

  return (
    <Container>
      <ShopForm onAddProduct={addProduct} />

      <Output>
        {products.map((product, index) => (
          <article key={index}>
            Name:{product.name}
            <br />
            Status:{product.status}
            <br />
            Price:{product.price} €<br />
            {product.tags.sort().join(", ")}
            <br />
            {product.category}
            <Favourite onClick={() => addToFavourites(product)}>
              {favouriteProducts.some(
                (favourite) => favourite.id === product.id
              )
                ? "🎮"
                : "✅"}
            </Favourite>
          </article>
        ))}
      </Output>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const Output = styled.div`
  position: relative;
  width: 70%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-radius: 10px;
  border: 3px solid rgba(255, 255, 255, 0.28);
  box-shadow: 10px 9px 13px 2px rgba(0, 0, 0, 0.74);
`;

const Favourite = styled.span`
  position: absolute;
  right: 15px;
  margin-top: -4rem;
  cursor: pointer;
  
`;
