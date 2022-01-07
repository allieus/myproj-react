import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';

function PageReviewList() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    const url = 'http://localhost:8000/shop/api/reviews/';
    // Promise 객체
    Axios.get(url)
      .then(({ data }) => {
        console.group('정상 응답');
        console.log(data);
        console.groupEnd();
        setReviewList(data);
      })
      .catch((error) => {
        console.group('에러 응답');
        console.log(error);
        console.groupEnd();
      });
  };

  return (
    <div>
      <h2>Review List</h2>
      <hr />
      <DebugStates reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
