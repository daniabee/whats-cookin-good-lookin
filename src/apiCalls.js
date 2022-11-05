var loadData = (url) => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("There was an error loading the data!");
    }
    return response.json();
  });
};

export default loadData;
