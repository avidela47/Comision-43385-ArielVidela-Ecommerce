import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa nueva categoria"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            name="form"
            required
            autoFocus
            autoComplete="none"
            maxLength={30}
            minLength={3}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Agregar
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
