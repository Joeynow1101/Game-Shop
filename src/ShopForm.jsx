import Select from "./Select";
import RadioButton from "./RadioButton";
import { useState } from "react";
import styled from "styled-components";
import productValid from "./lib/validation";
import CheckBox from "./CheckBox";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import Tags from "./ProductTags";
import { v4 as uuidv4 } from "uuid";

export default function ShopForm({ onAddProduct }) {
  const initialProduct = {
    name: "",
    price: 0,
    downloadCode: false,
    tags: [],
    status: "",
    contactEmail: "",
  };
  const [product, setProduct] = useState(initialProduct);
  const [hasFormErrors, setHasFormErrors] = useState(false);

  // const [tags, setProducts] = useState(["ONE", "TWO"]);
  function updateTags(tag) {
    const updateTags = [...product.tags, tag];
    setProduct({ ...product, tags: updateTags });
  }

  function deleteTag(clickedTag) {
    const remainingTags = product.tags.filter((everyTag) => {
      return everyTag !== clickedTag;
    });
    setProduct({ ...product, tags: remainingTags });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (productValid(product)) {
      //   setProducts([...products, product]);
      onAddProduct({ id: uuidv4(), ...product });

      // setProduct(initialProduct);
      setHasFormErrors(false);
    } else {
      setHasFormErrors(true);
    }
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;

    if (event.target.type === "checkbox") {
      inputValue = event.target.checked;
    }

    setProduct({
      ...product,
      [event.target.name]: inputValue,
    });
  };
  const platform = ["Playstation", "XBox", "PC", "Nintendo Switch"];

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Game Shop</Title>
      {hasFormErrors && (
        <ErrorMessage>
          <p>Please check if all fields are correctly filled.</p>
        </ErrorMessage>
      )}
      <TextInputName>
        <TextInput
          name="name"
          value={product.name}
          onTextInputChange={handleChange}
        >
          <h2>Game </h2>
        </TextInput>
      </TextInputName>
      <NumberInputPrice>
        <NumberInput
          name="price"
          value={product.price}
          onNumberInputChange={handleChange}
        >
          <h2>Price (in €) </h2>
        </NumberInput>
      </NumberInputPrice>
      <Code>
        <h2>Download Code</h2>
        <CheckBox
          name="downloadCode"
          value={product.downloadCode}
          onCheckboxChange={handleChange}
        ></CheckBox>
      </Code>

      <Select
        name="platform"
        value={product.platform}
        options={platform}
        onSelectChange={handleChange}
      >
        <h2>Platform</h2>
      </Select>

      <RadioButton value={product.status} onRadioChange={handleChange}>
        {" "}
        <h2>Status</h2>
      </RadioButton>
      <Tags
        label=""
        tags={product.tags}
        onUpdateTags={updateTags}
        onDeleteTag={deleteTag}
      ></Tags>
      <div>
        <h2>Contact</h2>
        <TextInput
          name="contactEmail"
          value={product.contactEmail}
          onTextInputChange={handleChange}
        ></TextInput>
      </div>

      <Buttons>
        <button>Add Game</button>

        <button type="reset" onClick={() => setProduct(initialProduct)}>
          Reset
        </button>
      </Buttons>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  width: 90%;
  xbackground-color: #ba9d9d;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.28);
  box-shadow: 10px 9px 13px 2px rgba(0, 0, 0, 0.74);
  input {
    border: none;
    padding: 0.25rem;
    border-radius: 10px;
    margin: 0.25rem;
  }
`;

const TextInputName = styled.div`
  input {
  }
`;
const NumberInputPrice = styled.div`
  input {
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    background-color: #eee;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    width: 7rem;
    border-radius: 10px;
    color: #090909;
    box-shadow: 0 0.4rem #dfd9d9;
    cursor: pointer;
    margin: 1rem;
  }
`;
const ErrorMessage = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16.5px);
  -webkit-backdrop-filter: blur(16.5px);
  border-radius: 10px;
  border: 3px solid rgba(255, 255, 255, 0.28);
  box-shadow: 10px 9px 13px 2px rgba(0, 0, 0, 0.4);

  color: #ff0000;
  display: flex;
  gap: 2.5rem;
  margin: 0 0 1rem;
  padding: 0.5rem;
`;

const Title = styled.h1`
  color: #fefefe;
  margin: 1rem;
  font-weight: bold;
  font-size: 3rem;
  font-family: Copperplate, Papyrus, fantasy;
`;
const Code = styled.div`
  display: flex;
`;
