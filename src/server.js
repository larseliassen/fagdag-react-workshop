// ⚠️ OBS ⚠️
// Denne filen inneholder kode som kaller serveren vår
// Du skal ikke egentlig trenge å forholde deg til denne koden,
// men om du debugger litt, eller lurer på hvorfor noe ikke fungerer,
// er det alltids lov å ta en titt.

const API_BASE_URL = "https://id.jobbnorge.no/api/jobsearch";

export const getFeed = async () => {
  const response = await fetch(
    `https://id.jobbnorge.no/api/jobsearch/cached?language=1`
  );
  const data = await response.json();
  return data;
};
