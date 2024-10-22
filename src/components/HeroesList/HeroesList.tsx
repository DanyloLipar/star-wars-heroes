import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import {
  fetchHeroes,
  setPage,
} from "../../core/store/reducers/app/appDataSlice";
import Loader from "../Loader";
import ClassNames from "classnames";

const HeroesList = () => {
  const { heroes, page, totalPages, loading, error } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHeroes(page));
  }, [dispatch, page, heroes.length]);

  const handleGetHeroes = (newPage: number) => {
    if (page !== newPage) {
      dispatch(setPage(newPage));
      dispatch(fetchHeroes(newPage));
    }
  };

  const createPagesLength = (): number[] => {
    const arr = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    return arr;
  };

  const minPage = () => {
    return page === 1 ? page - 1 : page - 2;
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      {!loading ? (
        <div className="heroes-list">
          {heroes.map((hero) => (
            <div key={hero.id} className="heroes-list__card">
              <Link
                className="heroes-list__card-link"
                to={`/heroes/${hero.id}`}
              >
                {hero.name}
              </Link>
              <div className="heroes-list__card-photo">
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
                  alt={hero.name}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
      <div className="pages">
        <button
          className="pages__btn"
          onClick={() => dispatch(setPage(page - 1))}
          disabled={loading || page <= 1}
        >
          {"<"}
        </button>
        <ul className="pages__list">
          {createPagesLength()
            .slice(minPage(), page + 1)
            .map((pageNum) => (
              <li
                key={pageNum}
                onClick={() => handleGetHeroes(pageNum)}
                className={ClassNames("pages__list-num", {
                  "selected-page": page === pageNum,
                })}
              >
                <span>{pageNum}</span>
              </li>
            ))}
        </ul>
        <button
          className="pages__btn"
          onClick={() => dispatch(setPage(page + 1))}
          disabled={loading || page === totalPages}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default HeroesList;
