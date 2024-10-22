import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IHero from "../../core/models/hero";
import IFilm from "../../core/models/film";
import IStarShip from "../../core/models/starship";
import GraphVisualization from "../GraphVizualization";
import AppService from "../../core/services/app.service";
import Loader from "../Loader";
import { UIRoutes } from "../../core/router";
import IPlanet from "../../core/models/planet";

const HeroDetails = () => {
  const { hero_id } = useParams<{ hero_id: string }>();
  const navigate = useNavigate();

  const [hero, setHero] = useState<IHero | null>(null);
  const [planet, setPlanet] = useState<IPlanet | null>(null);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [starships, setStarships] = useState<IStarShip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const heroResponse = await AppService.getHero(Number(hero_id));
        const heroData = heroResponse.data;
        setHero(heroData);

        if (heroData?.homeworld) {
          const planetResponse = await AppService.getPlanet(heroData.homeworld);
          setPlanet(planetResponse.data);
        }

        if (heroData && Array.isArray(heroData.films)) {
          const filmPromises = heroData.films.map((filmId: number) =>
            AppService.getFilm(filmId)
          );

          const filmResponses = await Promise.allSettled(filmPromises);
          const successfulFilms = filmResponses
            .filter(
              (result): result is PromiseFulfilledResult<any> =>
                result.status === "fulfilled"
            )
            .map((result) => result.value.data);
          setFilms(successfulFilms);
        }

        if (heroData && Array.isArray(heroData.starships)) {
          const starshipPromises = heroData.starships.map(
            (starshipId: number) => AppService.getStarship(starshipId)
          );

          const starshipResponses = await Promise.allSettled(starshipPromises);
          const successfulShips = starshipResponses
            .filter(
              (result): result is PromiseFulfilledResult<any> =>
                result.status === "fulfilled"
            )
            .map((result) => result.value.data);
          setStarships(successfulShips);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroDetails();
  }, [hero_id]);

  const handleBacktoList = () => {
    navigate(`${UIRoutes.HEROES}`);
  };

  if (loading) return <Loader />;

  if (!hero) return <div>No hero found.</div>;

  return (
    <section className="hero-details">
      <h1 className="hero-details__name">{hero.name}</h1>
      <div className="hero-details__box">
        <button className="hero-details__box-back" onClick={handleBacktoList}>
          Back to List
        </button>
        <div className="hero-details__box-info info">
          <div className="info__details">
            <div className="info__details-photo">
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
                alt={hero.name}
              />
            </div>
            <ul className="info__details-data">
              <li>
                <span>Gender: {hero.gender}</span>
              </li>
              <li>
                <span>Date of Birth: {hero.birth_year}</span>
              </li>
              <li>
                <span>Home Planet: {planet?.name || "Unknown"}</span>
              </li>
            </ul>
          </div>
          <div className="graph-container">
            <GraphVisualization
              hero={hero}
              films={films}
              starships={starships}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDetails;
