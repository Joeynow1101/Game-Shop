import { useState } from "react";
import styled from "styled-components";

function Tags({ label, tags, onUpdateTags, onDeleteTag }) {
  const [tagInput, setTagInput] = useState("");

  const handleChange = (event) => {
    const tagInputValue = event.target.value;
    setTagInput(tagInputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onUpdateTags(tagInput.toLocaleUpperCase());
      setTagInput("");
    }
    if (event.key === "Backspace" && tagInput === "" && tags.length > 0) {
      onDeleteTag(tags[tags.length - 1]);
    }
  };

  return (
    <TagsContainer>
      <h2>Product Tags</h2>
      <TagsWrapper>
        {tags.map((tag, Index) => (
          <Tag key={Index}>
            {tag}{" "}
            <span
              onClick={() => {
                onDeleteTag(tag);
              }}
            >
              X
            </span>
          </Tag>
        ))}
        <label htmlFor="tags">{label}</label>
        <input
          placeholder="Add a tag..."
          type="text"
          name="tags"
          id="tags"
          onChange={handleChange}
          value={tagInput}
          onKeyDown={handleKeyDown}
        />
      </TagsWrapper>
    </TagsContainer>
  );
}

export default Tags;

const TagsContainer = styled.section`
  background: rgba(255, 255, 255, 0.45);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: grid;
  margin: 0.5rem;
  input {
    margin: 0.25rem;
    height: 1.5rem;
    width: 80px;
    border: none;
    :focus {
      outline: none;
    }
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 8px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 0.5rem;

  padding: 0.25rem;
  border-radius: 10px;

  span {
    background: #ff00005d;
    border-radius: 20px;
    margin: 5px;
    cursor: pointer;
  }
`;
