import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import ReviewForm from 'components/ReviewForm';
import useFieldValues from 'hooks/useFieldValues';

function PageReviewForm() {
  // 상탯값 정의. 훅 호출
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const { fieldValues, handleFieldChange } = useFieldValues({
    score: 5,
    content: '',
  });

  // 다양한 함수를 정의
  const saveReview = async () => {
    const url = 'http://localhost:8000/shop/api/reviews/';
    try {
      await Axios.post(url, fieldValues);
      navigate('/reviews/');
    } catch (e) {
      console.error(e);
    }
  };

  // 표현 by jsx
  return (
    <div>
      <h2>
        ReviewForm
        {reviewId ? '수정' : '생성'}
      </h2>
      <ReviewForm
        fieldValues={fieldValues}
        handleFieldChange={handleFieldChange}
        handleSubmit={saveReview}
      />
      <DebugStates reviewId={reviewId} fieldValues={fieldValues} />
    </div>
  );
}

export default PageReviewForm;
