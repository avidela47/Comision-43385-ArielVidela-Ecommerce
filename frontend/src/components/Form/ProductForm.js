import React from "react";

const ProductForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type=""
            className="form-control"
            placeholder=""
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            name="form"
            required
            autoFocus
            autoComplete="none"            
            minLength={3}
          />         
        </div>
      </form>
    </>
  );
};

export default ProductForm;
