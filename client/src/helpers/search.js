export const addInterestsIds = (interests) => {
  let s = '';

  interests.forEach((val, i, arr) => {
    s += val.interest_id || val.id;
    if (arr.length !== i + 1) s += ',';
  });

  return s;
};

export const isMatchAll = (bool) =>
  bool ? '&matchAll=true' : '&matchAll=false';

export const distinguishAdaptiveAge = age => [age-2, age+2];

export const distinguishLocation = ({
  noDistance,
  country,
  city,
  myLocation,
}) => {
  let s = '';

  if (Object.values(noDistance).includes(true)) {
    if (noDistance.checkedCountry) s += `&country=${myLocation.split(', ')[2]}`;
    if (!noDistance.checkedCity) s += `&city=any`;
    if (noDistance.checkedCity)
      s += `&city=${myLocation.split(', ')[0]}, ${myLocation.split(', ')[1]}`;
  } else {
    if (country.code && !city.name) s += `&country=${country.name}&city=any`;
    if (country.code && city.name)
      s += `&country=${country.name}&city=${city.name}`;
  }

  if (!s) s += '&country=any&city=any';

  return s;
};

export const formUrl = ({
  base = 'api/search',
  country,
  city,
  selectedInterests,
  matchAll,
  selectedAge,
  selectedLanguages,
  matchMyInterests,
  noDistance,
  myLocation,
  loggedInUser,
}) => {
  let s = base + '?interests=';

  const interestsFinal = matchMyInterests
    ? loggedInUser.interests
    : selectedInterests;

  s += addInterestsIds(interestsFinal);
  s += isMatchAll(matchAll);
  s += distinguishLocation({
    noDistance,
    country,
    city,
    myLocation,
  });

  s+='&age=' + selectedAge.join(',')
  if(selectedLanguages) {
    s+='&languages=' + selectedLanguages.map(language=> language.id).join(',')
  }

  return s;
};

export const showPart = (arr, n) => arr.slice(0, n);

export const adjustInterests = (interests, n) => {
  if (interests.length > n) {
    return showPart(interests, n);
  }

  return interests;
};
