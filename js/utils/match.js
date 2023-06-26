export function checkMatch(firstElements, secondElements) {

  let filteredArray = [];

  firstElements.forEach((item) => {
    secondElements.forEach((item2) => {
      if (item.idDrink == item2.idDrink) {
        filteredArray.push(item);
      }
    });
  });

  return filteredArray;
};



