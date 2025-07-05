import { useParams, useNavigate } from 'react-router';

const Categories = () => {
  const { category, item } = useParams();
  const navigate = useNavigate();
  return (
    <div>
        Categories Page {category}
    </div>
  )
  }
export default Categories;