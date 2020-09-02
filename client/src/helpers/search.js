export const addInterestsIds = (interests) => {
  let s = '';

  interests.forEach((val, i, arr) => {
    s += val.interest_id || val.id;
    if (arr.length !== i + 1) s += ',';
  });

  return s;
};

export const isMatchAll = (bool) =>
  bool ? '?matchAll=true' : '?matchAll=false';

export const distinguishLocation = ({
  noDistance,
  country,
  city,
  myLocation,
}) => {
  let s = '';

  if (Object.values(noDistance).includes(true)) {
    if (noDistance.checkedCountry) s += `&country=${myLocation.split(', ')[1]}`;
    if (!noDistance.checkedCity) s += `&city=any`;
    if (noDistance.checkedCity) s += `&city=${myLocation.split(', ')[0]}`;
  } else {
    if (country.code) s += `&country=${country.code}`;
    if (!city.name) s += `&city=any`;
    if (city.name) s += `&city=${city.name}`;
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
  matchMyInterests,
  noDistance,
  myLocation,
  loggedInUser
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

  return s;
};
