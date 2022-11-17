import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function Editrecipe() {
  let { id } = useParams();
  const [editdata,serEditdata]= useState(null);
  const [inputFields, setInputFields] = useState([]);
  const[steps,setSteps] = useState([]);

  useEffect(() => {
    fetch(`https://624a7f84fd7e30c51c0e48a5.mockapi.io/FoodRecipe/${id}`)
      .then((data) => data.json())
      .then((result) => { 
        serEditdata(result)
        setInputFields(result.steps)
        setSteps(result.steps)
      });
  }, []);
 

  return (
    <div>
     {editdata?<EditFromData editdata={editdata} id={id} inputFields={inputFields} setInputFields={setInputFields} steps={steps} setSteps={setSteps}/>:"null"}
    </div>
  );
}

function EditFromData({editdata,inputFields,steps,setInputFields,setSteps,id}) {
 
    const initialValues = {
        name:editdata.name,
        poster: editdata.poster,
        time: editdata.time,
        steps: editdata.steps,
        ingredientName: editdata.ingredientName,
        ingredientQuantity: editdata.ingredientQuantity,
        type: editdata.type,
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
           enableReinitialize:true, 
          onSubmit: (values) => saveRecipe(values),
        });
    
      const addFields = () => {
        let newfield = "";
    
        setInputFields([...inputFields, newfield]);
       
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
      function saveRecipe(values) {
        console.log(values);
        fetch(`https://624a7f84fd7e30c51c0e48a5.mockapi.io/FoodRecipe/${id}`, {
          method: "PUT",
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
    return(
        <div class="container ">
        <div class="row d-flex align-items-center d-flex justify-content-center">
          <div class="col-sm-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="form_field"
                  type="text"
                  name="name"
                  placeholder="Enter your recipe name"
                  value={values.name}
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
                  value={values.poster}
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
                  value={values.time}
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
                  value={values.ingredientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the  ingredient name"
                />
  
                <input
                  className="form_field"
                  type="text"
                  name="ingredientQuantity"
                  value={values.ingredientQuantity}
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
                    defaultChecked={values.type==="veg"&&true}
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
                    defaultChecked={values.type==="non-veg"&&true}
                  />
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
                        name={`steps[${index}]`}
                        placeholder="step for cooking"
                        value={values.steps[index]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="error">{errors.steps && touched.steps ? errors.steps : null}</p>
                      {index ? (
                        <button
                          type="button"
                          className="buttonremove"
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
                save Recipe
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Editrecipe;
