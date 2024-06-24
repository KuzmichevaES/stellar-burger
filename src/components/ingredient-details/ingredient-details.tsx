import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  /** TODO: взять переменную из стора +*/
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.data.find((item) => item._id === id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
