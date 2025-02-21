import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { createCocktail } from "./coctailsThunk.ts";
import { CocktailMutation } from "../../types";
import FileInput from "../../components/FileInput/FileInput.tsx";
import ButtonLoading from "../../components/UI/UI/ButtonLoading/ButtonLoading.tsx";
import { selectCreateLoading } from "./coctailsSlice.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectUser } from '../users/UserSlice.ts';

const initialState = {
  name: "",
  receipt: "",
  ingredients: "",
  image: null,
};

const CocktailForm = () => {
  const [form, setForm] = useState<CocktailMutation>(initialState);
  const [ingredients, setIngredients] = useState<
    { title: string; quantity: number }[]
  >([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    ingredients.map((i) => {
      if (i.title.trim().length === 0 || i.quantity <= 0) {
        setError(true);
      }
    });
    if (
      form.name.trim().length === 0 ||
      form.receipt.trim().length === 0 ||
      form.image === null ||
      ingredients.length === 0 ||
      error
    ) {
      toast.error("Fill all fields");
    } else {
      dispatch(
        createCocktail({ ...form, ingredients: JSON.stringify(ingredients) }),
      );
      setForm(initialState);
      setIngredients([]);
      navigate(`/cocktails?userID=${user?._id}`);
    }
  };

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { title: "", quantity: 0 }]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_ing, i) => i !== index));
  };

  const onChangeIngredientsInputs = (
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setIngredients(
      ingredients.map((ing, index) => {
        const ingCopy = {
          ...ingredients[i],
          [name]: value,
        };

        if (index === i) return ingCopy;

        return ing;
      }),
    );
  };

  return (
    <div className="container-fluid ">
      <div className="col-md-10 col-sm-10 col-xl-10 offset-md-4 mx-auto ">
        <div className="form-container">
          <h3 className="title">Add new cocktail</h3>
          <form className="form-horizontal" onSubmit={submitFormHandler}>
            <div className={"form-group"}>
              <input
                className={"form-control"}
                id="name"
                name="name"
                required
                value={form.name}
                onChange={inputChangeHandler}
              />
              <label htmlFor={"name"}>Title</label>
            </div>

            <div className={"form-group"}>
              <label className={"fs-4 my-2"}>Ingredients</label>
              {ingredients.map((_ing, i) => (
                <div
                  className={
                    "container d-flex justify-content-between flex-row"
                  }
                  key={i}
                >
                  <div className={" w-100 m-2"}>
                    <input
                      className={"form-control"}
                      id={"nameIngredient"}
                      type="text"
                      name="title"
                      required
                      onChange={(e) => onChangeIngredientsInputs(i, e)}
                    />
                    <label htmlFor={"nameIngredient"}>Name</label>
                  </div>

                  <div className={" w-100 m-2"}>
                    <input
                      className={"form-control"}
                      id={"amountIngredient"}
                      type="number"
                      name="quantity"
                      min={0}
                      required
                      onChange={(e) => onChangeIngredientsInputs(i, e)}
                    />
                    <label htmlFor={"amountIngredient"}>Amount</label>
                  </div>

                  <div>
                    {ingredients.length <= 1 ? null : (
                      <div>
                        <button
                          type="button"
                          className={"btn ms-3"}
                          onClick={() => deleteIngredient(i)}
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  className={"btn d-block w-50 mx-auto text-center"}
                  onClick={addIngredient}
                >
                  {" "}
                  + Add new ingredient
                </button>
              </div>
            </div>

            <div className={"form-group"}>
              <textarea
                className={"form-control"}
                id="receipt"
                name="receipt"
                required
                value={form.receipt}
                onChange={inputChangeHandler}
              />
              <label htmlFor={"receipt"}>Receipt</label>
            </div>

            <div className={"form-group"}>
              <FileInput
                className={"form-control"}
                id="image"
                name="image"
                label="Image"
                onGetFile={fileEventChangeHandler}
                file={form.image}
              />
            </div>

            <ButtonLoading
              type="submit"
              text={"create"}
              isLoading={isCreateLoading}
              isDisabled={isCreateLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CocktailForm;
