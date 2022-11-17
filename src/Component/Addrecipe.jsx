import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import chef from "../images/chef.png";
import { useNavigate } from "react-router-dom";
function Addrecipe() {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([""]);

  const[steps,setSteps] = useState([""]);
  const initialValues = {
    name: "",
    poster: "",
    time: "",
    steps: steps,
    ingredientName: "",
    ingredientQuantity: "",
    type: "",
  };
  const validationSchema = yup.object({
    name: yup.string().min(6).max(15).required("fill the name fields"),
    poster: yup.string().url().required("fill the name poster"),
    time: yup.string().required("fill the time"),
    steps: yup.array().of(yup.string().required("Cannot be empty")).required(),
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
    console.log(index);
    let data = [...inputFields];
    data.splice(index, 1);
    let cookingstep=[...steps]
    values.steps.splice(index, 1)
     cookingstep.splice(index, 1);
    setInputFields(data);
    setSteps(cookingstep)
    console.log(steps)

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
        navigate(`/viewrecipe`);


      });
  }

  return (
    <> 
    <div className="container_addrecipe ">
    
        <div className="container_image">
          <img className="img-responsive" src={chef} alt="blow" />
        </div>
        <div className="container_form" >
      
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
                type="url"
                name="poster"
                placeholder="Enter your poster url"
                values={values.poster}
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
                values={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your cooking time"
              />
              <p className="error">
                {errors.time && touched.time ? errors.time : null}
              </p>
            </div>
           
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
            <div className="dynamicinput">
               
              <div>
              {inputFields.map((input, index) => {
                return (
                  <div key={index} className="cooking">
                    <div>
                    <input
                      className="form_field"
                      name={`steps[${index}]`}
                      placeholder="step for cooking"
                      value={values.steps[index]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="error">{errors.steps && touched.steps ? errors.steps : null}</p>
                    </div>
                   <div>
                   {index ? (
                      <button
                        type="button"
                        className="buttonremove"
                        onClick={() => removeFields(index)}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    ) : null}
                   </div>
                   
                  </div>
                );
              })}
                </div>      
                <button
                      type="button"
                      onClick={addFields}
                      className="btn-add"
                    >
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
               
            </div>
            <button type="submit" className="btn-add">
              Add Recipe
            </button>
          </form>
        </div>
      </div>
      </>
  );
}

export default Addrecipe;
