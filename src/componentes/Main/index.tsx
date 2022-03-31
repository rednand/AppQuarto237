import React, { useEffect, useState } from "react";
import { commingSoonMovies } from "../../api/axios";
import { CircularProgress, Box } from "@material-ui/core";
import { formatMonth, formatDate, formatMonthNumber } from "../../utils/data";
import {
  MainContainer,
  Container,
  MainLeft,
  Card,
  TimeLine,
  NextReleases,
  Section,
} from "./styles";

const Main = () => {
  const [movieData, setMovieData] = useState({ movies: [] as any[] });

  const todaysDate = new Date();
  const monthDate = formatMonth(todaysDate);

  useEffect(() => {
    commingSoonMovies.get("").then((response) => {
      setMovieData(response.data);
    });
  }, []);

  movieData.movies?.sort((menor, maior) =>
    menor["release_date"] > maior["release_date"]
      ? -1
      : menor["release_date"] > maior["release_date"]
      ? 1
      : 0
  );

  const ListMovieWithDataIdName = movieData.movies.map((item) => {
    return {
      movie: item["name"],
      data: formatDate(item["release_date"]),
      id: item["_id"],
      poster: item["poster"],
    };
  });
  console.log(ListMovieWithDataIdName);

  const groupBy = (movies, key) => {
    return movies.reduce(function (index, item) {
      (index[item[key]] = index[item[key]] || []).push(item);
      return index;
    }, {});
  };

  const GroupedMoviesByData = groupBy(ListMovieWithDataIdName, "data");

  return (
    <>
      <NextReleases>
        <h3>Em breve</h3>
        {movieData.movies
          .sort((menor, maior) =>
            menor["name"] < maior["name"]
              ? -1
              : menor["release_date"] > maior["release_date"]
              ? 1
              : 0
          )
          .map((film) => {
            const itemData = formatDate(film["release_date"]);
            const actualMonth = formatMonthNumber(monthDate);
            const filmMonth = formatMonthNumber(
              itemData
                .replaceAll("de", "")
                .replace(/[^a-zA-ZçÇ]/gi, " ")
                .replace(/ /g, "")
            );

            const monthCompareData = () => {
              if (actualMonth < filmMonth) {
                return true;
              }
            };

            if (monthCompareData()) {
              return (
                <div className="soon" key={film["id"]}>
                  <h2 className="nameSoon">{film["name"]}</h2>
                  <img
                    className="soonPoster"
                    src={`${film["poster"]}`}
                    alt={`poster${film["poster"]}`}
                  />
                  <p className="soonData"> {itemData}</p>
                </div>
              );
            }
          })}
      </NextReleases>
      <MainContainer>
        <MainLeft>
          <TimeLine />
          <Container>
            <>
              <h1 className="h2Class">
                Lançamentos de <span className="itemMes">{monthDate}</span>
              </h1>
              {movieData.movies.length > 0 ? (
                <>
                  {movieData.movies.map((film) => {
                    const itemData = formatDate(film["release_date"]);

                    if (itemData.includes(monthDate)) {
                      return (
                        <Card key={film["id"]}>
                          <div className="card">
                            <h2 className="titleItem">{film["name"]}</h2>
                            <p className="releaseItem"> {itemData}</p>
                            <p className="overviewItem">{film["overview"]}</p>
                          </div>
                          <div className="cardMedia">
                            <img
                              className="posterItem"
                              src={`${film["poster"]}`}
                              alt={`poster${film["poster"]}`}
                            />
                            <iframe
                              className="videoItem"
                              src={`https://www.youtube.com/embed/${film["trailer"]}`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                          </div>
                          <div className="buttonGenre">
                            {film["genre"].map((x, index) => {
                              return (
                                <p key={film["genre"][index]}>
                                  <button
                                    className="pbuttonGenre"
                                    onClick={() =>
                                      console.log("pegar filmes por gênero")
                                    }
                                  >
                                    {film["genre"][index]}
                                  </button>
                                </p>
                              );
                            })}
                          </div>
                        </Card>
                      );
                    }
                  })}
                </>
              ) : (
                <Box
                  component="div"
                  sx={{
                    margin: 50,
                  }}
                >
                  <CircularProgress
                    color="secondary"
                    thickness={10}
                    size={90}
                  />
                </Box>
              )}
            </>
          </Container>
        </MainLeft>
        <Section>
          <div className="divSection">
            <h2 className="sectionH3">LANÇAMENTOS ANTERIORES</h2>
            {Object.keys(GroupedMoviesByData).map((filmValue) => {
              const filmValuetoString = JSON.stringify(
                GroupedMoviesByData[filmValue]
              );
              const filmValuetoJson = JSON.parse(filmValuetoString);
              const filmValueMap = filmValuetoJson.map((item) => {
                return (
                  <a className="MovieLink" href={"/" + item?.id}>
                    {item["movie"]}
                  </a>
                );
              });

              const actualMonth = formatMonthNumber(monthDate);
              const filmMonth = formatMonthNumber(
                filmValue
                  .replaceAll("de", "")
                  .replace(/[^a-zA-ZçÇ]/gi, " ")
                  .replace(/ /g, "")
              );

              const monthCompare = () => {
                if (
                  typeof actualMonth === "number" &&
                  typeof filmMonth === "number"
                ) {
                  if (actualMonth >= filmMonth) {
                    return true;
                  } else {
                    return null;
                  }
                }
              };

              if (!filmValue.includes(monthDate) && monthCompare()) {
                return (
                  <div className="OldMovieList">
                    <>
                      <p className="OldMovieData">{filmValue}</p>
                      {filmValueMap}
                    </>
                  </div>
                );
              }
            })}
          </div>
        </Section>
      </MainContainer>
    </>
  );
};

export default Main;
