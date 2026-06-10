export function filterMovie(movList, search) {
  return movList.filter((elem) =>
    elem.title.toLowerCase().includes(search.toLowerCase()),
  );
}
