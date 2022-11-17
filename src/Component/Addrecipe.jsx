import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import chef from "../images/chef.png";
function Addrecipe() {
  const [inputFields, setInputFields] = useState([""]);

  let step = new Array();
  const initialValues = {
    name: "",
    poster: "",
    time: "",
    step: [step],
    ingredientName: "",
    ingredientQuantity: "",
    type: "",
  };
  const validationSchema = yup.object({
    name: yup.string().min(6).max(15).required("fill the name fields"),
    poster: yup.string().required("fill the name poster"),
    time: yup.string().required("fill the time"),
    step: yup.array().of(yup.string().required("Cannot be empty")).required(),
    ingredientName: yup.string().required("fill the ingredient name"),
    ingredientQuantity: yup.string().required("fill the ingredient Quantity"),
    type: yup.string().required("selcet the gender"),
  });

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => addRecipe(values),
    });

  const addFields = () => {
    let newfield = "";

    setInputFields([...inputFields, newfield]);
    console.log(inputFields);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  function addRecipe(values) {
    console.log(values);
    fetch("https://624a7f84fd7e30c51c0e48a5.mockapi.io/FoodRecipe", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div class="container ">
      <div class="row d-flex align-items-center d-flex justify-content-center">
        <div class="col-sm-6 ">
          <img class="img-responsive" src={chef} alt="blow" />
        </div>
        <div class="col-sm-6">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="form_field"
                type="text"
                name="name"
                placeholder="Enter your recipe name"
                values={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="error">
                {errors.name && touched.name ? errors.name : null}
              </p>
            </div>
            <div>
              <input
                className="form_field"
                type="file"
                name="poster"
                values={values.resume}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="error">
                {errors.poster && touched.poster ? errors.poster : null}
              </p>
            </div>
            <div>
              <input
                className="form_field"
                type="text"
                name="time"
                values={values.resume}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your cooking time"
              />
              <p className="error">
                {errors.time && touched.time ? errors.time : null}
              </p>
            </div>
            <div> Cooking Ingredient</div>
            <div className="cooking">
              <input
                className="form_field"
                type="text"
                name="ingredientName"
                values={values.ingredientName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter the  ingredient name"
              />

              <input
                className="form_field"
                type="text"
                name="ingredientQuantity"
                values={values.ingredientQuantity}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter the  ingredient Quantity"
              />
            </div>
            <div className="cooking">
              {" "}
              <p className="error">
                {errors.ingredientName && touched.ingredientName
                  ? errors.ingredientName
                  : null}
              </p>
              <p className="error">
                {errors.ingredientQuantity && touched.ingredientQuantity
                  ? errors.ingredientQuantity
                  : null}
              </p>
            </div>
            <div className="cooking">
              <div>
                {" "}
                <input
                  type="radio"
                  name="type"
                  value="veg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter"
                />
                veg
              </div>
              <div>
                {" "}
                <input
                  type="radio"
                  name="type"
                  value="non-veg"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                non-veg
              </div>
            </div>
            <div className="error">
              {" "}
              <p>{errors.type && touched.type ? errors.type : null}</p>
            </div>
            <div>
                <button
                      type="button"
                      onClick={addFields}
                      className="btn-add"
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
              {inputFields.map((input, index) => {
                return (
                  <div key={index} className="cooking">
                    <input
                      className="form_field"
                      name={`step[${index}]`}
                      placeholder="step for cooking"
                      value={values.step[index]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p>{errors.step && touched.step ? errors.step : null}</p>
                    {index ? (
                      <button
                        type="button"
                        className="button remove"
                        onClick={() => removeFields(index)}
                      >
                        Remove
                      </button>
                    ) : null}
                   
                  </div>
                );
              })}
               
            </div>
            <button type="submit" className="btn-add">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addrecipe;
